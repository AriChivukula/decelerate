# decelerate
This library provides an extendable spreadsheet parser.
## Internal API
Data accessors for directories of workbooks of sheets of rows/columns of cells.
### Directory
```
interface IDirectory {
  bindToSubDirectory(name: string, parser: DirectoryParser): this;
  bindToSubDirectories(match: RegExp, parser: DirectoryParser): this;
  bindToWorkbook(name: string, parser: WorkbookParser): this;
  bindToWorkbooks(match: RegExp, parser: WorkbookParser): this;
}
```
### Workbook
```
interface IWorkbook {
  bindToSheet(name: string, parser: SheetParser): this;
  bindToSheets(match: RegExp, parser: SheetParser): this;
}
```
### Sheet
```
interface ISheet {
  bindToColumn(index: number, parser: ColumnParser): this;
  bindToColumnRange(start: number, length: number, parser: ColumnParser): this;
  bindToRow(index: number, parser: RowParser): this;
  bindToRowRange(start: number, length: number, parser: RowParser): this;
}
```
### Column/Row
```
interface IColumn {
  bindToCell(index: number, parser: CellParser): this;
  bindToCellRange(start: number, length: number, parser: CellParser): this;
}
interface IRow {
  bindToCell(index: number, parser: CellParser): this;
  bindToCellRange(start: number, length: number, parser: CellParser): this;
}
```
### Cell
```
interface ICell {
  toBoolean(): boolean;
  toNumber(): number;
  toString(): string;
}
```
## External API
Data parsers to define extraction of data from cells from rows/columns from sheets from workbooks from directories.
### Cell
```
type CellParser = async (cell: ICell) => Promise<boolean | number | string>
```
### Column/Row
```
type ColumnParser = async (column: IColumn) => Promise<void>
type RowParser = async (row: IRow) => Promise<void>
```
### Sheet
```
type SheetParser = async (sheet: ISheet) => Promise<void>
```
### Workbook
```
type WorkbookParser = async (workbook: IWorkbook) => Promise<void>
```
### Directory
```
type DirectoryParser = async (directory: IDirectory) => Promise<void>
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
