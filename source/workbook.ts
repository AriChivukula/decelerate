import {
  CanBeExplained,
} from "./explain";
import {
  SheetParser,
} from "./sheet";

export type WorkbookParser = async (workbook: IWorkbook) => Promise<void>;

export interface IWorkbook {
  bindToSheet(name: string, parser: SheetParser): this;
  bindToSheets(match: RegExp, parser: SheetParser): this;
}

export class Workbook implements IWorkbook, CanBeExplained {
  bindToSheet(name: string, parser: SheetParser): this {
    return this;
  }

  bindToSheets(match: RegExp, parser: SheetParser): this {
    return this;
  }

  explain(): Object {
    return {};
  }
}
