import {
  WorkBook,
} from "xlsx";

import {
  ICanFilterEmpty,
  ITarget,
  HasTargetsAndCanFilterEmpty,
  TExplained,
} from "./common";
import {
  Sheet,
  SheetParser,
} from "./sheet";

export type WorkbookParser = (workbook: IWorkbook) => Promise<void>;

export interface IWorkbook extends ICanFilterEmpty {
  bindToSheet(name: string | RegExp, parser: SheetParser): this;
}

export interface IWorkbookTarget extends ITarget {
  readonly name: string | RegExp;
  readonly parser: SheetParser,
}

export class Workbook extends HasTargetsAndCanFilterEmpty<IWorkbookTarget> implements IWorkbook {
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

  async explain(): Promise<TExplained> {
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    const promiseArray = [];
    for (const target of this.getTargets()) {
      const sheetNames = await this.getMatchingSheetNames(target.name);
      for (const sheetName of sheetNames) {
        promiseArray.push((async () => {
          const sheet = new Sheet(this.wb.Sheets[sheetName]);
          await target.parser(sheet);
          const explained = await sheet.explain();
          if (Object.keys(explained.inner).length === 0 && this.shouldFilterEmpty) {
            return;
          }
          finalTargets.inner[sheetName] = explained;
        })());
      }
    }
    await Promise.all(promiseArray);
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
