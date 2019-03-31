import {
  Directory,
} from "../source/directory";
import {
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

export function demoDirectory(): Directory {
  return new Directory();
}

export function demoWorkbook(): Workbook {
  return new Workbook();
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
