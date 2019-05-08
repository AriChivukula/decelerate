import {
  WorkBook,
} from "xlsx";

import {
  ICanExportAndExplain,
  ITarget,
  HasTargets,
  TExplained,
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
  readonly name: string | RegExp;
  readonly parser: SheetParser,
}

export class Workbook extends HasTargets<IWorkbookTarget> implements IWorkbook {
  constructor(
    private readonly wb: WorkBook,
  ) {
    super();
  }

  bindToSheet(name: string | RegExp, parser: SheetParser): this {
    this.addTarget({
      name,
      parser,
    });
    return this;
  }

  protected async explain(): Promise<TExplained> {
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    const promiseArray = [];
    for (const target of this.getTargets()) {
      const sheetNames = await this.getMatchingSheetNames(target.name);
      const promises = [];
      for (const sheetName of sheetNames) {
        promises.push((async () => {
          const sheet = new Sheet(this.wb.Sheets[sheetName]);
          await target.parser(sheet);
          finalTargets.inner[sheetName] = await sheet.explain();
        })());
      }
    }
    await Promise.all(promises);
    return finalTargets;
  }

  private async getMatchingSheetNames(nameMatch: string | RegExp): Promise<string[]> {
    const matches: string[] = [];
    for (const sheetName in this.wb.Sheets) {
      if (typeof nameMatch === "string") {
        if (sheetName === nameMatch) {
          matches.push(sheetName);
        }
      } else {
        if (sheetName.match(nameMatch)) {
          matches.push(sheetName);
        }
      }
    }
    return matches;
  }
}
