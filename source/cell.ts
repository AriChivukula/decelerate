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
  const lowerRaw = raw.toLowerCase().trim();
  return lowerRaw != "" && lowerRaw != "false" && lowerRaw != "0";
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
    const exported = await this.export();
    return {
      parser: this.constructor.name,
      inner: {},
      value: exported,
    };
  }

  async export(): Promise<TExported> {
    return await this.parser(utils.format_cell(this.ws[utils.encode_cell({r: this.rowIdx, c: this.columnIdx})]));
  }
}
