export type CellParser = (cell: ICell) => Promise<boolean | number | string>;

export async function CellBooleanParser(cell: ICell): Promise<boolean> {
  return cell.toBoolean();
}

export async function CellNumberParser(cell: ICell): Promise<number> {
  return cell.toNumber();
}

export async function CellStringParser(cell: ICell): Promise<string> {
  return cell.toString();
}

export interface ICell {
  toBoolean(): boolean;
  toNumber(): number;
  toString(): string;
}

export class Cell implements ICell {
  toBoolean(): boolean {
    return false;
  }

  toNumber(): number {
    return 0;
  }

  toString(): string {
    return "";
  }
}
