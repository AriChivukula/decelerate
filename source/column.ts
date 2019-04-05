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

  protected async explore(
    target: IListTarget,
    appendToOutput: (key: string, value: ICanExportAndExplain) => Promise<void>,
  ): Promise<void> {
    const cell = new Cell(this.ws, target.index, this.columnIdx, target.parser);
    await appendToOutput(target.name + ":" + target.index, cell);
  }
}
