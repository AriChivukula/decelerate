# decelerate
This library provides an extendable spreadsheet parser.
## Internal API
Data accessors for directories of workbooks of sheets of rows/columns of cells.
### Directory
```
interface Directory {
  bindToSubDirectory(name: string, parser: DirectoryParser): this;
  bindToSubDirectories(match: RegExp, parser: DirectoryParser): this;
  bindToWorkbook(name: string, parser: WorkbookParser): this;
  bindToWorkbooks(match: RegExp, parser: WorkbookParser): this;
}
```
### Workbook
```
interface Workbook {
  bindToSheet(name: string, parser: SheetParser): this;
  bindToSheets(match: RegExp, parser: SheetParser): this;
}
```
### Sheet
```
interface Sheet {
  bindToColumn(index: number, parser: ColumnParser): this;
  bindToColumnRange(start: number, length: number, parser: ColumnParser): this;
  bindToRow(index: number, parser: RowParser): this;
  bindToRowRange(start: number, length: number, parser: RowParser): this;
}
```
### Column/Row
```
interface Column {
  bindToCell(index: number, parser: CellParser): this;
  bindToCellRange(start: number, length: number, parser: CellParser): this;
}
interface Row {
  bindToCell(index: number, parser: CellParser): this;
  bindToCellRange(start: number, length: number, parser: CellParser): this;
}
```
### Cell
```
interface Cell {
  toBoolean(): this;
  toNumber(): this;
  toString(): this;
}
```
## External API
Data parsers to define extraction of data from cells from rows/columns from sheets from workbooks from directories.
### Cell
```
type CellParser = async (cell: Cell) => Promise<boolean | number | string>
```
### Column/Row
```
type ColumnParser = async (column: Column) => Promise<void>
type RowParser = async (row: Row) => Promise<void>
```
### Sheet
```
type SheetParser = async (sheet: Sheet) => Promise<void>
```
### Workbook
```
type WorkbookParser = async (workbook: Workbook) => Promise<void>
```
### Directory
```
type DirectoryParser = async (directory: Directory) => Promise<void>
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
