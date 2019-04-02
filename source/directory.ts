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
  readonly name: string | RegExp;
}

export interface IDirectoryDirectoryTarget extends IDirectoryTarget {
  kind: "Directory";
  readonly parser: DirectoryParser;
}

export interface IDirectoryWorkbookTarget extends IDirectoryTarget {
  kind: "Workbook";
  readonly parser: WorkbookParser;
}

export class Directory extends HasTargets<IDirectoryDirectoryTarget | IDirectoryWorkbookTarget> implements IDirectory, CanBeExplained, CanBeExported {
  constructor(
    private readonly path: string,
  ) {
    super();
  }

  bindToSubDirectory(name: string, parser: DirectoryParser): this {
    this.addTarget({
      name,
      parser,
      kind: "Directory",
    });
    return this;
  }

  bindToSubDirectories(name: RegExp, parser: DirectoryParser): this {
    this.addTarget({
      name,
      parser,
      kind: "Directory",
    });
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

  bindToWorkbooks(name: RegExp, parser: WorkbookParser): this {
    this.addTarget({
      name,
      parser,
      kind: "Directory",
    });
    return this;
  }

  getTargetKey(target: IDirectoryDirectoryTarget | IDirectoryWorkbookTarget): string {
    return typeof target.name == "string" ? target.name : target.name.toString();
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
