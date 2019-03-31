import {
  CanBeExplained,
  TExplained,
  CanBeExported,
  TExported,
  ITarget,
  HasTargets,
} from "./common";
import {
  SheetParser,
} from "./sheet";

export type WorkbookParser = (workbook: IWorkbook) => Promise<void>;

export interface IWorkbook {
  bindToSheet(name: string, parser: SheetParser): this;
  bindToSheets(match: RegExp, parser: SheetParser): this;
}

export interface IWorkbookTarget extends ITarget {
  readonly parser: SheetParser,
}

export class Workbook extends HasTargets<IWorkbookTarget> implements IWorkbook, CanBeExplained, CanBeExported {
  bindToSheet(name: string, parser: SheetParser): this {
    return this;
  }

  bindToSheets(match: RegExp, parser: SheetParser): this {
    return this;
  }

  getTargetKey(target: IWorkbookTarget): string {
    return target.name;
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
