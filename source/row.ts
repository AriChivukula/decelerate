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
  explain(): TExplained {
    return {
      parser: this.constructor.name,
      inner: {},
    };
  }

  export(): Promise<TExported> {
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
