import {
  CanBeExplained,
} from "./explain";
import {
  WorkbookParser,
} from "./workbook";

export type DirectoryParser = async (directory: IDirectory) => Promise<void>;

export interface IDirectory {
  bindToSubDirectory(name: string, parser: DirectoryParser): this;
  bindToSubDirectories(match: RegExp, parser: DirectoryParser): this;
  bindToWorkbook(name: string, parser: WorkbookParser): this;
  bindToWorkbooks(match: RegExp, parser: WorkbookParser): this;
}

export class Directory implements IDirectory, CanBeExplained {
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

  explain(): Object {
    return {};
  }
}
