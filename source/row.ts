import {
  WorkSheet,
} from "xlsx";

import {
  ICanExportAndExplain,
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

  protected async explore(
    target: IListTarget,
    appendToOutput: (key: string, value: ICanExportAndExplain) => Promise<void>,
  ): Promise<void> {
    const cell = new Cell(this.ws, this.rowIdx, target.index, target.parser);
    await appendToOutput(target.name + ":" + target.index, cell);
  }
}
