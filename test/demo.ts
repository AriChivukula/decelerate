import {
  readFile,
} from "xlsx";

import {
  IDirectory,
  Directory,
} from "../source/directory";
import {
  IWorkbook,
  Workbook,
} from "../source/workbook";
import {
  ISheet,
  Sheet,
} from "../source/sheet";
import {
  IList,
} from "../source/list";
import {
  Column,
} from "../source/column";
import {
  Row,
} from "../source/row";
import {
  Cell,
  CellBooleanParser,
  CellNumberParser,
  CellStringParser,
} from "../source/cell";

async function demoDirectoryParserA(directory: IDirectory): Promise<void> {
  directory
    .bindToSubDirectory("sub", demoDirectoryParserB)
    .bindToWorkbook("fake_client_a.xlsx", demoWorkbookParser);
}


async function demoDirectoryParserB(directory: IDirectory): Promise<void> {
  directory
    .collapse("/")
    .bindToSubDirectory(/fake_client/, demoDirectoryParserB)
    .bindToWorkbook(/fake_client_.\.xlsx/, demoWorkbookParser);
}

export function demoDirectory(): Directory {
  const directory = new Directory("./test/data/");
  demoDirectoryParserA(directory);
  return directory;
}

async function demoWorkbookParser(workbook: IWorkbook): Promise<void> {
  workbook
    .bindToSheet("Other Questions", demoSheetParser)
    .bindToSheet(/Harm Details/, demoSheetParser);
}

export function demoWorkbook(): Workbook {
  const workbook = new Workbook(readFile("./test/data/fake_client_a.xlsx"));
  demoWorkbookParser(workbook);
  return workbook;
}

async function demoSheetParser(sheet: ISheet): Promise<void> {
  sheet
    .bindToColumn("M", 25, demoListParser)
    .bindToColumnRange("N", 26, 2, demoListParser)
    .bindToRow("0", 25, demoListParser)
    .bindToRowRange("P", 26, 2, demoListParser)
    .bindToCell("Q", 35, 35, CellBooleanParser);
}

export function demoSheet(): Sheet {
  const sheet = new Sheet(readFile("./test/data/fake_client_a.xlsx").Sheets["Harm Details"]);
  demoSheetParser(sheet);
  return sheet;
}

async function demoListParser(list: IList): Promise<void> {
  list
    .bindToCell("A", 25, CellBooleanParser)
    .bindToCellRange("B", 26, 2, CellNumberParser)
    .bindToCell("C", 28, CellStringParser)
    .bindToCellRange("D", 29, 2, async (raw: string) => "test");
}

export function demoColumn(): Column {
  const column = new Column(readFile("./test/data/fake_client_a.xlsx").Sheets["Harm Details"], 0);
  demoListParser(column);
  return column;
}

export function demoRow(): Row {
  const row = new Row(readFile("./test/data/fake_client_a.xlsx").Sheets["Harm Details"], 0);
  demoListParser(row);
  return row;
}
