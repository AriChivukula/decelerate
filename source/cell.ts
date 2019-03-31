import {
  CanBeExplained,
} from "./explain";

export type CellParser = async (cell: ICell) => Promise<void>;

export interface ICell {
  toBoolean(): this;
  toNumber(): this;
  toString(): this;
}

export class Cell implements ICell, CanBeExplained {
  toBoolean(): this {
    return this;
  }

  toNumber(): this {
    return this;
  }

  toString(): this {
    return this;
  }

  explain(): Object {
    return {};
  }
}
