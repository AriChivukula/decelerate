import {
  TExplained,
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
  bindToSheet(name: string | RegExp, parser: SheetParser): this;
}

export interface IWorkbookTarget extends ITarget {
  readonly name: string;
  readonly parser: SheetParser,
}

export class Workbook extends HasTargets<IWorkbookTarget> implements IWorkbook {
  constructor(
    private readonly path: string,
  ) {
    super();
  }

  bindToSheet(name: string | RegExp, parser: SheetParser): this {
    this.addTarget({
      name: typeof name === "string" ? name : name.toString(),
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
