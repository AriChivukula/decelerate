import {
  CanBeExplained,
  CanBeExported,
  TExplained,
  TExported,
} from "./interfaces";
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

export class Directory implements IDirectory, CanBeExplained, CanBeExported {
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
