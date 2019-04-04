import {
  IDirectory,
  IWorkbook,
  ISheet,
  IColumn,
  IRow,
  CellBooleanParser,
  CellNumberParser,
  CellStringParser,
} from "../../source/index";

export default async function(directory: IDirectory): Promise<void> {
  directory
    .bindToWorkbook(/\.xlsx/, workbookParser);
}

async function workbookParser(workbook: IWorkbook): Promise<void> {
  workbook
    .bindToSheet("Other Questions", otherQuestionParser)
    .bindToSheet(/Harm Details/, harmDetailParser);
}

async function otherQuestionParser(sheet: ISheet): Promise<void> {
}

async function harmDetailParser(sheet: ISheet): Promise<void> {
}

async function demoRowParser(list: IRow): Promise<void> {
}

async function demoColumnParser(list: IColumn): Promise<void> {
}

async function demoCellParser(raw: string): Promise<string> {
  return "";
}

