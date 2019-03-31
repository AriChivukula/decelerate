import {
  CanBeExplained,
  TExplained,
  CanBeExported,
  TExported,
} from "./explain";
import {
  CellParser,
} from "./cell";

export type ListParser<T extends IList> = (list: T) => Promise<void>;

export interface IList {
  bindToCell(index: number, parser: CellParser): this;
  bindToCellRange(start: number, length: number, parser: CellParser): this;
}

export abstract class List implements IList, CanBeExplained, CanBeExported {
  bindToCell(index: number, parser: CellParser): this {
    return this;
  }

  bindToCellRange(start: number, length: number, parser: CellParser): this {
    return this;
  }

  explain(): TExplained {
    return {
      parser: this.constructor.name,
      inner: {},
    };
  }

  export(): TExported {
    return {};
  }
}
