import {
  IDirectory,
  IWorkbook,
  ISheet,
  IRow,
  CellStringParser,
} from "../../source/index";

export default async function(directory: IDirectory): Promise<void> {
  directory
    .bindToWorkbook(/\.xlsx/, workbookParser);
}

async function workbookParser(workbook: IWorkbook): Promise<void> {
  workbook
    .bindToSheet(/Harm Details/, harmDetailParser)
    .bindToSheet("Other Questions", otherQuestionParser);
}

async function harmDetailParser(sheet: ISheet): Promise<void> {
  sheet
    .bindToRowRange("row", 4, 14, harmDetailRowParser);
}

async function harmDetailRowParser(row: IRow): Promise<void> {
  row
    .bindToCell("type", 1, CellStringParser)
    .bindToCell("actor", 2, CellStringParser)
    .bindToCell("age", 3, CellStringParser)
    .bindToCell("frequency", 4, CellStringParser)
    .bindToCell("notes", 5, CellStringParser);
}

async function otherQuestionParser(sheet: ISheet): Promise<void> {
}
