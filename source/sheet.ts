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

export type SheetParser = (sheet: ISheet) => Promise<void>;

export interface ISheet {
  bindToColumn(name: string, index: number, parser: ColumnParser): this;
  bindToColumnRange(name: string, start: number, length: number, parser: ColumnParser): this;
  bindToRow(name: string, index: number, parser: RowParser): this;
  bindToRowRange(name: string, start: number, length: number, parser: RowParser): this;
}

export interface ISheetTarget extends ITarget {
  readonly name: string;
  readonly index: number;
}

export interface ISheetColumnTarget extends ISheetTarget {
  readonly kind: "Column";
  readonly parser: ColumnParser;
}

export interface ISheetRowTarget extends ISheetTarget {
  readonly kind: "Row";
  readonly parser: RowParser;
}

export class Sheet extends HasTargets<ISheetColumnTarget | ISheetRowTarget> implements ISheet {
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

  protected async explore(
    appendToOutput: (key: string, value: ICanExportAndExplain) => Promise<void>,
  ): Promise<void> {
    for (const target of this.getTargets()) {
      switch (target.kind) {
        case "Column":
          const column = new Column();
          await target.parser(column);
          await appendToOutput(target.name + ":" + target.index, column);
          break;
        case "Row":
          const row = new Row();
          await target.parser(row);
          await appendToOutput(target.name + ":" + target.index, row);
          break;
      }
    }
  }
}
