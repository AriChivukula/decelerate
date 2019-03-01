# decelerate
This library provides an extendable spreadsheet parser.
## Internal API
Data accessors for directories of workbooks of sheets of rows/columns of cells.
### Directory
```
type DirectoryOutput = { [key: string]:  (DirectoryBinding | WorkbookBinding)[]; };
interface DirectoryBinding {
  execute(): DirectoryOutput
}
interface Directory {
  bindParserToSubDirectory(parser: DirectoryParser, name: string): DirectoryBinding;
  bindParserToSubDirectories(parser: DirectoryParser, match: RegExp): DirectoryBinding;
  bindParserToWorkbook(parser: WorkbookParser, name: string): WorkbookBinding;
  bindParserToWorkbooks(parser: WorkbookParser, match: RegExp): WorkbookBinding;
}
```
### Workbook
```
type WorkbookOutput = { [key: string]:  SheetBinding[]; };
interface WorkbookBinding {
  execute(): WorkbookOutput;
}
interface Workbook {
  bindParserToSheet(parser: SheetParser, name: string): SheetBinding;
  bindParserToSheets(parser: SheetParser, match: RegExp): SheetBinding;
}
```
### Sheet
```
type SheetOutput = { [key: string]:  (ColumnBinding | RowBinding)[]; };
interface SheetBinding {
  execute(): SheetOutput;
}
interface Sheet {
  bindParserToColumn(parser: ColumnParser, index: number): ColumnBinding;
  bindParserToColumnRange(parser: ColumnParser, start: number, length: number): ColumnBinding;
  bindParserToRow(parser: RowParser, index: number): RowBinding;
  bindParserToRowRange(parser: RowParser, start: number, length: number): RowBinding;
}
```
### Column/Row
```
type ColumnOutput = { [key: string]:  CellBinding[]; };
type RowOutput = { [key: string]:  CellBinding[]; };
interface ColumnBinding {
  execute(): ColumnOutput;
}
interface RowBinding {
  execute(): RowOutput;
}
interface Column {
  bindParserToCell(parser: CellParser, index: number): CellBinding;
  bindParserToCellRange(parser: CellParser, start: number, length: number): CellBinding;
}
interface Row {
  bindParserToCell(parser: CellParser, index: number): CellBinding;
  bindParserToCellRange(parser: CellParser, start: number, length: number): CellBinding;
}
```
### Cell
```
type CellOutput = { [key: string]:  boolean | number | string; };
interface CellBinding {
  execute(): CellOutput;
}
interface Cell {
  toBoolean(): boolean;
  toNumber(): number;
  toString(): string;
}
```
## External API
Data parsers to define extraction of data from cells from rows/columns from sheets from workbooks from directories.
### Cell
```
type CellParser = async (cell: Cell) => Promise<CellOutput>
```
### Column/Row
```
type ColumnParser = async (column: Column) => Promise<ColumnOutput>
type RowParser = async (row: Row) => Promise<RowOutput>
```
### Sheet
```
type SheetParser = async (sheet: Sheet) => Promise<SheetOutput>
```
### Workbook
```
type WorkbookParser = async (workbook: Workbook) => Promise<WorkbookOutput>
```
### Directory
```
type DirectoryParser = async (directory: Directory) => Promise<DirectoryOutput>
```
## CLI
```
npx decelerate --directory ROOT_DIRECTORY --parser ROOT_PARSER
```
### Root Directory
The directory within which all target spreadsheets are.
### Root Parser
The `DirectoryParser` default export of the `.ts` module.
### Output
`JSON` results from the actualized parse tree.
