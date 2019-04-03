import {
  WorkSheet,
  utils,
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
    console.log(utils.encode_cell({r: this.rowIdx, c: this.columnIdx}));
    console.log(this.ws[utils.encode_cell({r: this.rowIdx, c: this.columnIdx})]);
    return await this.parser(utils.format_cell(this.ws[utils.encode_cell({r: this.rowIdx, c: this.columnIdx})]));
  }
}
