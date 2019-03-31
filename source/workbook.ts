import {
  SheetParser,
} from "./sheet";

type WorkbookParser = async (workbook: IWorkbook) => Promise<void>

export interface IWorkbook {
  bindToSheet(name: string, parser: SheetParser): this;
  bindToSheets(match: RegExp, parser: SheetParser): this;
}

export class Workbook implements IWorkbook {
  bindToSheet(name: string, parser: SheetParser): this {
    return this;
  }

  bindToSheets(match: RegExp, parser: SheetParser): this {
    return this;
  }
}
