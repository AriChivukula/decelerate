import {
  WorkSheet,
} from "xlsx";

import {
  ICanExportAndExplain,
  ITarget,
  HasTargets,
} from "./common";
import {
  Column,
  ColumnParser,
} from "./column";
import {
  Row,
  RowParser,
} from "./row";
import {
  Cell,
  CellParser,
} from "./cell";

export type SheetParser = (sheet: ISheet) => Promise<void>;

export interface ISheet {
  bindToColumn(name: string, index: number, parser: ColumnParser): this;
  bindToColumnRange(name: string, start: number, length: number, parser: ColumnParser): this;
  bindToRow(name: string, index: number, parser: RowParser): this;
  bindToRowRange(name: string, start: number, length: number, parser: RowParser): this;
  bindToCell(name: string, row: number, column: number, parser: CellParser): this;
}

export interface ISheetTarget extends ITarget {
  readonly name: string;
}

export interface ISheetColumnTarget extends ISheetTarget {
  readonly index: number;
  readonly kind: "Column";
  readonly parser: ColumnParser;
}

export interface ISheetRowTarget extends ISheetTarget {
  readonly index: number;
  readonly kind: "Row";
  readonly parser: RowParser;
}

export interface ISheetCellTarget extends ISheetTarget {
  readonly row: number;
  readonly column: number;
  readonly kind: "Cell";
  readonly parser: CellParser;
}

export class Sheet extends HasTargets<ISheetColumnTarget | ISheetRowTarget | ISheetCellTarget> implements ISheet {
  constructor(
    private readonly ws: WorkSheet,
  ) {
    super();
  }

  bindToColumn(name: string, index: number, parser: ColumnParser): this {
    this.addTarget({
      name,
      index,
      parser,
      kind: "Column",
    });
    return this;
  }

  bindToColumnRange(name: string, start: number, length: number, parser: ColumnParser): this {
    for (let idx = start; idx < start + length; idx++) {
      this.bindToColumn(name, idx, parser);
    }
    return this;
  }

  bindToRow(name: string, index: number, parser: RowParser): this {
    this.addTarget({
      name,
      index,
      parser,
      kind: "Row",
    });
    return this;
  }

  bindToRowRange(name: string, start: number, length: number, parser: RowParser): this {
    for (let idx = start; idx < start + length; idx++) {
      this.bindToRow(name, idx, parser);
    }
    return this;
  }

  bindToCell(name: string, row: number, column: number, parser: CellParser): this {
    this.addTarget({
      name,
      row,
      column,
      parser,
      kind: "Cell",
    });
    return this;
  }

  protected async explore(
    appendToOutput: (key: string, value: ICanExportAndExplain) => Promise<void>,
  ): Promise<void> {
    for (const target of this.getTargets()) {
      switch (target.kind) {
        case "Column":
          const column = new Column(this.ws, target.index);
          await target.parser(column);
          await appendToOutput(target.name + ":" + target.index, column);
          break;
        case "Row":
          const row = new Row(this.ws, target.index);
          await target.parser(row);
          await appendToOutput(target.name + ":" + target.index, row);
          break;
        case "Cell":
          const cell = new Cell(this.ws, target.row, target.column);
          await target.parser(cell);
          await appendToOutput(cell.name + ":" + target.row + ":" + target.column, cell);
          break;
      }
    }
  }
}
