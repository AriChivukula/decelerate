import {
  CanBeExplained,
  TExplained,
  CanBeExported,
  TExported,
} from "./interfaces";
import {
  SheetParser,
} from "./sheet";

export type WorkbookParser = (workbook: IWorkbook) => Promise<void>;

export interface IWorkbook {
  bindToSheet(name: string, parser: SheetParser): this;
  bindToSheets(match: RegExp, parser: SheetParser): this;
}

export class Workbook implements IWorkbook, CanBeExplained, CanBeExported {
  bindToSheet(name: string, parser: SheetParser): this {
    return this;
  }

  bindToSheets(match: RegExp, parser: SheetParser): this {
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
