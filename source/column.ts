import {
  CanBeExplained,
  TExplained,
  CanBeExported,
  TExported,
} from "./common";
import {
  IList,
  IListTarget,
  List,
  ListParser,
} from "./list";
import {
  Cell
} from "./cell";

export type ColumnParser = ListParser<IColumn>;

export interface IColumn extends IList {
}

export class Column extends List implements IColumn, CanBeExplained, CanBeExported {
  async explain(): Promise<TExplained> {
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    for (const target of this.getTargets()) {
      finalTargets.inner[target.name + ":" + target.index] = null;
    }
    return finalTargets;
  }

  async export(): Promise<TExported> {
    const finalTargets: TExported = {};
    for (const target of this.getTargets()) {
      const cell = new Cell();
      finalTargets[target.name + ":" + target.index] = await target.parser(cell);
    }
    return finalTargets;
  }
}
