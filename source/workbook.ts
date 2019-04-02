import {
  CanBeExplained,
  TExplained,
  CanBeExported,
  TExported,
  ITarget,
  HasTargets,
} from "./common";
import {
  Sheet,
  SheetParser,
} from "./sheet";

export type WorkbookParser = (workbook: IWorkbook) => Promise<void>;

export interface IWorkbook {
  bindToSheet(name: string, parser: SheetParser): this;
  bindToSheets(match: RegExp, parser: SheetParser): this;
}

export interface IWorkbookTarget extends ITarget {
  readonly name: string;
  readonly parser: SheetParser,
}

export class Workbook extends HasTargets<IWorkbookTarget> implements IWorkbook, CanBeExplained, CanBeExported {
  constructor(
    private readonly path: string,
  ) {
    super();
  }

  bindToSheet(name: string, parser: SheetParser): this {
    this.addTarget({
      name,
      parser,
    });
    return this;
  }

  bindToSheets(name: RegExp, parser: SheetParser): this {
    this.addTarget({
      name: name.toString(),
      parser,
    });
    return this;
  }

  async explain(): Promise<TExplained> {
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    for (const target of this.getTargets()) {
      const sheet = new Sheet();
      await target.parser(sheet);
      finalTargets.inner[target.name] = await sheet.explain();
    }
    return finalTargets;
  }

  async export(): Promise<TExported> {
    const finalTargets: TExported = {};
    for (const target of this.getTargets()) {
      const sheet = new Sheet();
      await target.parser(sheet);
      finalTargets[target.name] = await sheet.export();
    }
    return finalTargets;
  }
}
