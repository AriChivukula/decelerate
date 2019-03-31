import {
  CanBeExplained,
  TExplained,
  CanBeExported,
  TExported,
} from "./explain";
import {
  ColumnParser,
} from "./column";
import {
  RowParser,
} from "./row";

export type SheetParser = (sheet: ISheet) => Promise<void>;

export interface ISheet {
  bindToColumn(index: number, parser: ColumnParser): this;
  bindToColumnRange(start: number, length: number, parser: ColumnParser): this;
  bindToRow(index: number, parser: RowParser): this;
  bindToRowRange(start: number, length: number, parser: RowParser): this;
}

export class Sheet implements ISheet, CanBeExplained, CanBeExported {
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

  explain(): TExplained {
    return {
      parser: this.constructor.name,
      inner: {},
    };
  }

  export(): TExported {
    return {};
  }
}
