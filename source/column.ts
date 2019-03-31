import {
  IList,
  List,
  ListParser,
} from "./list";

export type ColumnParser = ListParser<IColumn>;

export interface IColumn extends IList {
}

export class Column extends List implements IColumn {
  explain(): Object {
    return {};
  }
}
