import {
  CanBeExplained,
  TExplained,
  CanBeExported,
  TExported,
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

export class Sheet extends HasTargets<ISheetColumnTarget | ISheetRowTarget> implements ISheet, CanBeExplained, CanBeExported {
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

  getTargetKey(target: ISheetTarget): string {
    return target.name + ":" + target.index;
  }

  explain(): TExplained {
    return {
      parser: this.constructor.name,
      inner: {},
    };
  }

  async export(): Promise<TExported> {
    const targets = this.getTargets();
    const finalTargets: TExported = {};
    for (const key in targets) {
      const target = targets[key];
      switch (target.kind) {
        case "Column":
          const column = new Column();
          await target.parser(column);
          finalTargets[key] = await column.export();
          break;
        case "Row":
          const row = new Row();
          await target.parser(row);
          finalTargets[key] = await row.export();
          break;
      }
    }
    return finalTargets;
  }
}
