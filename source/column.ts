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
    const targets = this.getTargets();
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    for (const key in targets) {
      finalTargets.inner[key] = null;
    }
    return finalTargets;
  }

  async export(): Promise<TExported> {
    const targets = this.getTargets();
    const finalTargets: TExported = {};
    for (const key in targets) {
      const cell = new Cell();
      const target = targets[key];
      finalTargets[key] = await target.parser(cell);
    }
    return finalTargets;
  }
}
