import {
  ICanExportAndExplain,
  TExplained,
  TExported,
} from "./common";

type CellParser = (raw: string) => boolean | number | string;

export async function CellBooleanParser(raw: string): Promise<boolean> {
  return Boolean(JSON.parse(raw));
}

export async function CellNumberParser(raw: string): Promise<number> {
  return Number(JSON.parse(raw));
}

export async function CellStringParser(raw: string): Promise<string> {
  return raw;
}

export interface ICell {
  bind(parser: CellParser): void;
}

export class Cell implements ICell, ICanExportAndExplain {
  private parser: CellParser = CellStringParser;
  
  bind(parser: CellParser): void {
    this.parser = parser;
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
