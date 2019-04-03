import {
  TExplained,
  TExported,
} from "./common";
import {
  IList,
  List,
  ListParser,
} from "./list";
import {
  Cell,
} from "./cell";

export type RowParser = ListParser<IRow>;

export interface IRow extends IList {
}

export class Row extends List implements IRow {
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
