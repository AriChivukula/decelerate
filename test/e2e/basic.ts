import {
  IDirectory,
  IWorkbook,
  ISheet,
  IList,
  CellBooleanParser,
  CellNumberParser,
  CellStringParser,
} from "../../source/index";

export default async function(directory: IDirectory): Promise<void> {
  directory
    .bindToSubDirectory("sub", demoDirectoryParser)
    .bindToWorkbook("fake_client_a.xlsx", demoWorkbookParser);
}


async function demoDirectoryParser(directory: IDirectory): Promise<void> {
  directory
    .bindToSubDirectory(/fake_client/, demoDirectoryParser)
    .bindToWorkbook(/fake_client_.\.xlsx/, demoWorkbookParser);
}

async function demoWorkbookParser(workbook: IWorkbook): Promise<void> {
  workbook
    .bindToSheet("Other Questions", demoSheetParser)
    .bindToSheet(/Harm Details/, demoSheetParser);
}

async function demoSheetParser(sheet: ISheet): Promise<void> {
  sheet
    .bindToColumn("M", 25, demoListParser)
    .bindToColumnRange("N", 26, 2, demoListParser)
    .bindToRow("0", 25, demoListParser)
    .bindToRowRange("P", 26, 2, demoListParser);
}

async function demoListParser(list: IList): Promise<void> {
  list
    .bindToCell("A", 25, CellBooleanParser)
    .bindToCellRange("B", 26, 2, CellNumberParser)
    .bindToCell("C", 28, CellStringParser)
    .bindToCellRange("D", 29, 2, async (raw: string) => "test");
}
