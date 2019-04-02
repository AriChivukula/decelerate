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
  readonly name: string | RegExp;
  readonly parser: SheetParser,
}

export class Workbook extends HasTargets<IWorkbookTarget> implements IWorkbook, CanBeExplained, CanBeExported {
  bindToSheet(name: string, parser: SheetParser): this {
    this.addTarget({
      name,
      parser,
    });
    return this;
  }

  bindToSheets(name: RegExp, parser: SheetParser): this {
    this.addTarget({
      name,
      parser,
    });
    return this;
  }

  getTargetKey(target: IWorkbookTarget): string {
    return target.name;
  }

  async explain(): Promise<TExplained> {
    const targets = this.getTargets();
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    for (const key in targets) {
      const target = targets[key];
      const sheet = new Sheet();
      await target.parser(sheet);
      finalTargets.inner[key] = await sheet.explain();
    }
    return finalTargets;
  }

  async export(): Promise<TExported> {
    const targets = this.getTargets();
    const finalTargets: TExported = {};
    for (const key in targets) {
      const target = targets[key];
      const sheet = new Sheet();
      await target.parser(sheet);
      finalTargets[key] = await sheet.export();
    }
    return finalTargets;
  }
}
