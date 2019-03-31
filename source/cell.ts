import {
  CanBeExplained,
} from "./explain";

export type CellParser = async (cell: ICell) => Promise<void>;
export type ValueParser = async (string: raw) => Promise<boolean | number | string>;

export interface ICell {
  toBoolean(): this;
  toNumber(): this;
  toString(): this;
  toCustom(parser: ValueParser): this;
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

  toCustom(parser: ValueParser): this {
    return this;
  }

  explain(): Object {
    return {};
  }
}
