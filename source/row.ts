import {
  WorkSheet,
} from "xlsx";

import {
  ICanExportAndExplain,
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
  constructor(
    private readonly ws: WorkSheet,
    private readonly rowIdx: number,
  ) {
    super();
  }

  protected async explore(
    appendToOutput: (key: string, value: ICanExportAndExplain) => Promise<void>,
  ): Promise<void> {
    for (const target of this.getTargets()) {
      const cell = new Cell(this.ws, this.rowIdx, target.index, target.parser);
      await appendToOutput(target.name + ":" + target.index, cell);
    }
  }
}
