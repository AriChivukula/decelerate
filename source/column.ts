import {
  WorkSheet,
} from "xlsx";

import {
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

export class Column extends List implements IColumn {
  constructor(
    private readonly ws: WorkSheet,
    private readonly columnIdx: number,
  ) {
    super();
  }
  
  async explain(): Promise<TExplained> {
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    const promiseArray = [];
    for (const target of this.getTargets()) {
      promiseArray.push(async () => {
        const cell = new Cell(this.ws, target.index, this.columnIdx, target.parser);
        finalTargets.inner[target.name + ":" + target.index] = cell.explain();
      })());
    }
    await Promise.all(promiseArray);
    return finalTargets;
  }
}
