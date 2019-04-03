import {
  TExplained,
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
  async protected explore(
    appendToOutput: (key: string, value: HasTargets<ITarget>) => Promise<void>,
  ): Promise<void> {
    for (const target of this.getTargets()) {
      const cell = new Cell();
      await target.parser(cell);
      await appendToOutput(target.name + ":" + target.index, cell);
    }
  }
}
