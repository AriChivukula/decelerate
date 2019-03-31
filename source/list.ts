import {
  ITarget,
  HasTargets,
} from "./common";
import {
  CellParser,
} from "./cell";

export type ListParser<T extends IList> = (list: T) => Promise<void>;

export interface IList {
  bindToCell(name: string, index: number, parser: CellParser): this;
  bindToCellRange(name: string, start: number, length: number, parser: CellParser): this;
}

export interface IListTarget extends ITarget {
  readonly index: number,
  readonly parser: CellParser,
}

export abstract class List<T extends IListTarget> extends HasTargets<T> implements IList {
  bindToCell(name: string, index: number, parser: CellParser): this {
    return this;
  }

  bindToCellRange(name: string, start: number, length: number, parser: CellParser): this {
    return this;
  }

  getTargetKey(target: IListTarget): string {
    return target.name + target.index;
  }
}
