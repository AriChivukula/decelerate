import {
  CanBeExplained,
  TExplained,
  CanBeExported,
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

export class Row extends List implements IRow, CanBeExplained, CanBeExported {
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
