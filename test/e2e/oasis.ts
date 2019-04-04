import {
  IDirectory,
  IWorkbook,
  ISheet,
  IRow,
  RowParser,
  CellBooleanParser,
  CellStringParser,
} from "../../source/index";

export default async function(directory: IDirectory): Promise<void> {
  directory
    .bindToWorkbook(/\.xlsx/, workbookParser);
}

async function workbookParser(workbook: IWorkbook): Promise<void> {
  workbook
    .bindToSheet(/Harm Details/, harmDetailParser)
    .bindToSheet("Other Questions", otherQuestionsParser);
}

async function harmDetailParser(sheet: ISheet): Promise<void> {
  sheet
    .bindToRowRange("row", 4, 14, harmDetailRowParser);
}

async function harmDetailRowParser(row: IRow): Promise<void> {
  row
    .bindToCell("type", 1, CellStringParser)
    .bindToCell("actor", 2, CellStringParser)
    .bindToCell("age", 3, CellStringParser)
    .bindToCell("frequency", 4, CellStringParser)
    .bindToCell("notes", 5, CellStringParser);
}

async function otherQuestionsParser(sheet: ISheet): Promise<void> {
  sheet
    .bindToRow("mental_health", 2, otherQuestionsTristateParser(2))
    .bindToRow("serious_harm", 2, otherQuestionsTristateParser(6))
    .bindToRow("isolation_in_us", 2, otherQuestionsTristateParser(10))
    .bindToRow("harm_in_us", 2, otherQuestionsTristateParser(14))
    .bindToRow("country_of_origin", 5, otherQuestionsTristateParser(14));
}

function otherQuestionsTristateParser(start: number): RowParser {
  return async (row: IRow) => Promise<void> {
    row
      .bindToCell("yes", start, CellBooleanParser)
      .bindToCell("no", start + 1, CellBooleanParser)
      .bindToCell("n/a", start + 2, CellBooleanParser);
  };
}

async function otherQuestionsCountryParser(row: IRow): Promise<void> {
  row
    .bindToCell("name", 8, CellStringParser);
}
