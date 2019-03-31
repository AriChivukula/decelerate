import {
  ColumnParser,
  RowParser,
} from "./list";

type SheetParser = async (sheet: ISheet) => Promise<void>;

export interface ISheet {
  bindToColumn(index: number, parser: ColumnParser): this;
  bindToColumnRange(start: number, length: number, parser: ColumnParser): this;
  bindToRow(index: number, parser: RowParser): this;
  bindToRowRange(start: number, length: number, parser: RowParser): this;
}

export class Sheet implements ISheet {
  bindToColumn(index: number, parser: ColumnParser): this {
    return this;
  }

  bindToColumnRange(start: number, length: number, parser: ColumnParser): this {
    return this;
  }

  bindToRow(index: number, parser: RowParser): this {
    return this;
  }

  bindToRowRange(start: number, length: number, parser: RowParser): this {
    return this;
  }
}
