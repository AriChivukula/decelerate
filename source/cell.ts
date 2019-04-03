import {
  ICanExportAndExplain,
  TExplained,
  TExported,
} from "./common";

export type CellParser = (raw: string) => Promise<boolean | number | string>;

export async function CellBooleanParser(raw: string): Promise<boolean> {
  return Boolean(JSON.parse(raw));
}

export async function CellNumberParser(raw: string): Promise<number> {
  return Number(JSON.parse(raw));
}

export async function CellStringParser(raw: string): Promise<string> {
  return raw;
}

export class Cell implements ICanExportAndExplain {
  constructor(
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
    return this.parser("");
  }
}
