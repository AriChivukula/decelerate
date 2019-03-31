import {
  CanBeExplained,
  TExplained,
  CanBeExported,
  TExported,
  ITarget,
  HasTargets,
} from "./common";
import {
  ColumnParser,
} from "./column";
import {
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
  readonly index: number,
  readonly parser: ColumnParser | RowParser,
}

export class Sheet extends HasTargets<ISheetTarget> implements ISheet, CanBeExplained, CanBeExported {
  bindToColumn(name: string, index: number, parser: ColumnParser): this {
    return this;
  }

  bindToColumnRange(name: string, start: number, length: number, parser: ColumnParser): this {
    return this;
  }

  bindToRow(name: string, index: number, parser: RowParser): this {
    return this;
  }

  bindToRowRange(name: string, start: number, length: number, parser: RowParser): this {
    return this;
  }

  getTargetKey(target: T): string {
    return target.name + ":" + target.index;
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
