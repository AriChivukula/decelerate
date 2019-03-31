import {
  Directory,
} from "../source/directory";
import {
  Workbook,
} from "../source/workbook";
import {
  Sheet,
} from "../source/sheet";
import {
  Column,
} from "../source/column";
import {
  Row,
} from "../source/row";

export function demoDirectory(): Directory {
  return new Directory();
}

export function demoWorkbook(): Workbook {
  return new Workbook();
}

export function demoSheet(): Sheet {
  return new Sheet();
}

export function demoColumn(): Column {
  return new Column();
}

export function demoRow(): Row {
  return new Row();
}
