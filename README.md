# decelerate
This library provides an extendable spreadsheet parser.
## Internal API
Data accessors for directories of workbooks of sheets of rows/columns of cells.
### Structural
```
```
### Directory
```
interface IDirectory {
  bindToSubDirectory(name: string | RegExp, parser: DirectoryParser): this;
  bindToWorkbook(name: string | RegExp, parser: WorkbookParser): this;
}
```
### Workbook
```
interface IWorkbook {
  bindToSheet(name: string | RegExp, parser: SheetParser): this;
}
```
### Sheet
```
interface ISheet {
  bindToColumn(name: string, index: number, parser: ColumnParser): this;
  bindToColumnRange(name: string, start: number, length: number, parser: ColumnParser): this;
  bindToRow(name: string, index: number, parser: RowParser): this;
  bindToRowRange(name: string, start: number, length: number, parser: RowParser): this;
  bindToCell(name: string, row: number, column: number, parser: CellParser): this;
}
```
### Column/Row
```
interface IColumn {
  bindToCell(name: string, index: number, parser: CellParser): this;
  bindToCellRange(name: string, start: number, length: number, parser: CellParser): this;
}
interface IRow {
  bindToCell(name: string, index: number, parser: CellParser): this;
  bindToCellRange(name: string, start: number, length: number, parser: CellParser): this;
}
```
## External API
Data parsers to define extraction of data from cells from rows/columns from sheets from workbooks from directories.
### Cell
```
type CellParser = async (raw: string) => Promise<boolean | number | string>
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
