import {
  ICanExportAndExplain,
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

export class Column extends List implements IColumn {
  protected async explore(
    appendToOutput: (key: string, value: ICanExportAndExplain) => Promise<void>,
  ): Promise<void> {
    for (const target of this.getTargets()) {
      const cell = new Cell(target.parser);
      await appendToOutput(target.name + ":" + target.index, cell);
    }
  }
}
