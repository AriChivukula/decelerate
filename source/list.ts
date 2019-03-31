import {
  CanBeExplained,
  TExplained,
  CanBeExported,
  TExported,
} from "./interfaces";
import {
  CellParser,
} from "./cell";

export type ListParser<T extends IList> = (list: T) => Promise<void>;

export interface IList {
  bindToCell(name: string, index: number, parser: CellParser): this;
  bindToCellRange(name: string, start: number, length: number, parser: CellParser): this;
}

export abstract class List implements IList, CanBeExplained, CanBeExported {
  bindToCell(name: string, index: number, parser: CellParser): this {
    return this;
  }

  bindToCellRange(name: string, start: number, length: number, parser: CellParser): this {
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
