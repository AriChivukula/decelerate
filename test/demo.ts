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
  ICell,
  Cell,
} from "../source/cell";

async function demoDirectoryParserA(directory: IDirectory): Promise<void> {
  directory
    .bindToSubDirectory("sub", demoDirectoryParserB)
    .bindToWorkbook("fake_client_a.xlsx", demoWorkbookParser);
}


async function demoDirectoryParserB(directory: IDirectory): Promise<void> {
  directory
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
    .bindToSheet("Q", demoSheetParser)
    .bindToSheet(/R/, demoSheetParser);
}

export function demoWorkbook(): Workbook {
  const workbook = new Workbook("");
  demoWorkbookParser(workbook);
  return workbook;
}

async function demoSheetParser(sheet: ISheet): Promise<void> {
  sheet
    .bindToColumn("M", 0, demoListParser)
    .bindToColumnRange("N", 1, 2, demoListParser)
    .bindToRow("0", 0, demoListParser)
    .bindToRowRange("P", 1, 2, demoListParser);
}

export function demoSheet(): Sheet {
  const sheet = new Sheet();
  demoSheetParser(sheet);
  return sheet;
}

async function demoListParser(list: IList): Promise<void> {
  list
    .bindToCell("A", 0, demoCellParser)
    .bindToCellRange("B", 1, 2, demoCellParser);
}

export function demoColumn(): Column {
  const column = new Column();
  demoListParser(column);
  return column;
}

export function demoRow(): Row {
  const row = new Row();
  demoListParser(row);
  return row;
}

async function demoCellParser(cell: ICell): Promise<string> {
  return "test";
}

export function demoCell(): Cell {
  return new Cell();
}
