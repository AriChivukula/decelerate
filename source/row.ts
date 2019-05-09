import {
  WorkSheet,
} from "xlsx";

import {
  TExplained,
} from "./common";
import {
  IList,
  IListTarget,
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
  constructor(
    private readonly ws: WorkSheet,
    private readonly rowIdx: number,
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
      promiseArray.push((async () => {
        const cell = new Cell(this.ws, this.rowIdx, target.index, target.parser);
        const explained = await cell.explain();
        if ((explained.value === false || explained.value === 0 || explained.value === "") && this.shouldFilterEmpty) {
          return;
        }
        finalTargets.inner[target.name + ":" + target.index] = explained;
      })());
    }
    await Promise.all(promiseArray);
    return finalTargets;
  }
}
