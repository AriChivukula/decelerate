import {
  join,
} from "path";

import {
  CanBeExplained,
  CanBeExported,
  TExplained,
  TExported,
  ITarget,
  HasTargets,
} from "./common";
import {
  Workbook,
  WorkbookParser,
} from "./workbook";

export type DirectoryParser = (directory: IDirectory) => Promise<void>;

export interface IDirectory {
  bindToSubDirectory(name: string, parser: DirectoryParser): this;
  bindToSubDirectories(match: RegExp, parser: DirectoryParser): this;
  bindToWorkbook(name: string, parser: WorkbookParser): this;
  bindToWorkbooks(match: RegExp, parser: WorkbookParser): this;
}

export interface IDirectoryTarget extends ITarget {
}

export interface IDirectoryDirectoryTarget extends ITarget {
  kind: "Directory";
  readonly parser: DirectoryParser;
}

export interface IDirectoryWorkbookTarget extends ITarget {
  kind: "Workbook";
  readonly parser: WorkbookParser;
}

export class Directory extends HasTargets<IDirectoryDirectoryTarget | IDirectoryWorkbookTarget> implements IDirectory, CanBeExplained, CanBeExported {
  constructor(
    readonly private path: string,
  ) {}

  bindToSubDirectory(name: string, parser: DirectoryParser): this {
    this.addTarget({
      name,
      parser,
      kind: "Directory",
    });
    return this;
  }

  bindToSubDirectories(match: RegExp, parser: DirectoryParser): this {
    this.bindToSubDirectory(match.toString(), parser);
    return this;
  }

  bindToWorkbook(name: string, parser: WorkbookParser): this {
    this.addTarget({
      name,
      parser,
      kind: "Workbook",
    });
    return this;
  }

  bindToWorkbooks(match: RegExp, parser: WorkbookParser): this {
    this.bindToWorkbook(match.toString(), parser);
    return this;
  }

  getTargetKey(target: IDirectoryDirectoryTarget | IDirectoryWorkbookTarget): string {
    return target.name;
  }

  async explain(): Promise<TExplained> {
    const targets = this.getTargets();
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    for (const key in targets) {
      const target = targets[key];
      switch (target.kind) {
        case "Directory":
          const directory = new Directory(join(this.path, target.name));
          await target.parser(directory);
          finalTargets.inner[key] = await directory.explain();
          break;
        case "Workbook":
          const workbook = new Workbook();
          await target.parser(workbook);
          finalTargets.inner[key] = await workbook.explain();
          break;
      }
    }
    return finalTargets;
  }

  async export(): Promise<TExported> {
    const targets = this.getTargets();
    const finalTargets: TExported = {};
    for (const key in targets) {
      const target = targets[key];
      switch (target.kind) {
        case "Directory":
          const directory = new Directory(join(this.path, target.name));
          await target.parser(directory);
          finalTargets[key] = await directory.export();
          break;
        case "Workbook":
          const workbook = new Workbook();
          await target.parser(workbook);
          finalTargets[key] = await workbook.export();
          break;
      }
    }
    return finalTargets;
  }
}
