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
  kind: "Directory";
  readonly parser: DirectoryParser | WorkbookParser,
}

export class Directory extends HasTargets<IDirectoryTarget> implements IDirectory, CanBeExplained, CanBeExported {
  bindToSubDirectory(name: string, parser: DirectoryParser): this {
    return this;
  }

  bindToSubDirectories(match: RegExp, parser: DirectoryParser): this {
    return this;
  }

  bindToWorkbook(name: string, parser: WorkbookParser): this {
    return this;
  }

  bindToWorkbooks(match: RegExp, parser: WorkbookParser): this {
    return this;
  }

  getTargetKey(target: IDirectoryTarget): string {
    return target.name;
  }

  explain(): TExplained {
    return {
      parser: this.constructor.name,
      inner: {},
    };
  }

  async export(): Promise<TExported> {
    const targets = this.getTargets();
    const finalTargets: TExported = {};
    for (const key in targets) {
      const target = targets[key];
      switch (target.type) {
        case "Directory":
          const directory = new Directory();
          await target.parse(directory);
          finalTargets[key] = await directory.export();
        case "Workbook":
          const workbook = new Workbook();
          await target.parse(workbook);
          finalTargets[key] = await workbook.export();
      }
    }
    return finalTargets;
  }
}
