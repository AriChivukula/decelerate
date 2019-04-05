import {
  IDirectory,
  IWorkbook,
  ISheet,
  IRow,
  RowParser,
  CellBooleanParser,
  CellStringParser,
} from "../../source/index";

export default directoryParser;

async function directoryParser(directory: IDirectory): Promise<void> {
  directory
    .bindToWorkbook(/\.xlsx/, workbookParser)
    .bindToSubDirectory(/.*/, directoryParser);
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
    .bindToColumnRange("mental_health_diagnosis", 3, 2, otherQuestionsMentalHealthDiagnosisParser)
    .bindToColumnRange("serious_harm_type", 6, 2, otherQuestionsSeriousHarmTypeParser)
    .bindToCell("country_of_origin", 5, 9, CellStringParser);
}

function otherQuestionsTristateParser(start: number): RowParser {
  return async (row: IRow): Promise<void> => {
    row
      .bindToCell("yes", start, CellBooleanParser)
      .bindToCell("no", start + 1, CellBooleanParser)
      .bindToCell("n/a", start + 2, CellBooleanParser);
  };
}

async function otherQuestionsMentalHealthDiagnosisParser(row: IRow): Promise<void> {
  row
    .bindToCell("ptsd", 5, CellBooleanParser)
    .bindToCell("anxiety", 6, CellBooleanParser)
    .bindToCell("depression", 7, CellBooleanParser)
    .bindToCell("other", 8, CellBooleanParser);
}

async function otherQuestionsSeriousHarmTypeParser(row: IRow): Promise<void> {
  row
    .bindToCell("medical", 5, CellBooleanParser)
    .bindToCell("economic", 6, CellBooleanParser)
    .bindToCell("crime", 7, CellBooleanParser)
    .bindToCell("dv_or_pa", 8, CellBooleanParser)
    .bindToCell("other", 9, CellBooleanParser);
}
