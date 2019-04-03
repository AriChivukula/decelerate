import {
  WorkSheet,
  Utils,
} from "xlsx";

import {
  ICanExportAndExplain,
  TExplained,
  TExported,
} from "./common";

export type CellParser = (raw: string) => Promise<boolean | number | string>;

export async function CellBooleanParser(raw: string): Promise<boolean> {
  return Boolean(raw);
}

export async function CellNumberParser(raw: string): Promise<number> {
  return Number(raw);
}

export async function CellStringParser(raw: string): Promise<string> {
  return raw;
}

export class Cell implements ICanExportAndExplain {
  constructor(
    private readonly ws: WorkSheet,
    private readonly rowIdx: number,
    private readonly columnIdx: number,
    private readonly parser: CellParser,
  ) {
  }

  async explain(): Promise<TExplained> {
    return {
      parser: this.constructor.name,
      inner: {},
    };
  }

  async export(): Promise<TExported> {
    return await this.parser(String(this.ws[Utils.encode_cell({r: this.rowIdx, c: this.columnIdx})].v));
  }
}
