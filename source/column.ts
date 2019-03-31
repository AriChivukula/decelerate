import {
  CanBeExported,
  TExported,
} from "./common";
import {
  IList,
  List,
  ListParser,
} from "./list";
import {
  Cell
} from "./cell";

export type ColumnParser = ListParser<IColumn>;

export interface IColumn extends IList {
}

export class Column extends List implements IColumn, CanBeExported {
  async export(): Promise<TExported> {
    const targets = this.getTargets();
    const finalTargets: TExported = {};
    for (const key in targets) {
      const cell = new Cell();
      finalTargets[key] = await targets[key].parser(cell);
    }
    return finalTargets;
  }
}
