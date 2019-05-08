import {
  ICanFilterEmpty,
  ITarget,
  HasTargetsAndCanFilterEmpty,
} from "./common";
import {
  CellParser,
} from "./cell";

export type ListParser<T extends IList> = (list: T) => Promise<void>;

export interface IList extends ICanFilterEmpty {
  bindToCell(name: string, index: number, parser: CellParser): this;
  bindToCellRange(name: string, start: number, length: number, parser: CellParser): this;
}

export interface IListTarget extends ITarget {
  readonly name: string;
  readonly index: number,
  readonly parser: CellParser,
}

export abstract class List extends HasTargetsAndCanFilterEmpty<IListTarget> implements IList {
  bindToCell(name: string, index: number, parser: CellParser): this {
    this.addTarget({
      name,
      index,
      parser,
    });
    return this;
  }

  bindToCellRange(name: string, start: number, length: number, parser: CellParser): this {
    for (let idx = start; idx < start + length; idx++) {
      this.bindToCell(name, idx, parser);
    }
    return this;
  }
}
