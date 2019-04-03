import {
  WorkBook,
} from "xlsx";

import {
  ICanExportAndExplain,
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

  protected async explore(
    appendToOutput: (key: string, value: ICanExportAndExplain) => Promise<void>,
  ): Promise<void> {
    for (const target of this.getTargets()) {
      const sheetNames = await this.getMatchingSheetNames(target.name);
      for (const sheetName of sheetNames) {
        const sheet = new Sheet();
        await target.parser(sheet);
        await appendToOutput(sheetName, sheet);
      }
    }
  }

  private async getMatchingSheetNames(nameMatch: string | RegExp): Promise<string[]> {
    const matches: string[] = [];
    for (const sheetName in this.wb.Sheets) {
      if (typeof nameMatch === "string") {
        if (sheetName === nameMatch) {
          matches.push(endName);
        }
      } else {
        if (sheetName.match(nameMatch)) {
          matches.push(endName);
        }
      }
    }
    return matches;
  }
}
