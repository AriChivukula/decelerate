import {
  IList,
  List,
  ListParser,
} from "./list";

export type RowParser = ListParser<IRow>;

export interface IRow extends IList {
}

export class Row extends List implements IRow {
}
