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
} from "./Cell";

export type ColumnParser = ListParser<IColumn>;

export interface IColumn extends IList {
}

export class Column extends List implements IColumn, CanBeExported {
  export(): TExported {
    const targets = this.getTargets();
    const finalTargets: TExported = {};
    for (const key in targets) {
      const cell = new Cell();
      finalTargets[key] = targets[key].parser(cell);
    }
    return finalTargets;
  }
}
