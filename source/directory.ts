import {
  CanBeExplained,
  CanBeExported,
  TExplained,
  TExported,
  ITarget,
  HasTargets,
} from "./common";
import {
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

  export(): TExported {
    return {};
  }
}
