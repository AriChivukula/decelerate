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
  kind: "Sheet",
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
      switch (target.type) {
        case "Column":
          const column = new Column();
          await target.parse(column);
          finalTargets[key] = await column.export();
        case "Row":
          const row = new Row();
          await target.parse(row);
          finalTargets[key] = await row.export();
      }
    }
    return finalTargets;
  }
}
