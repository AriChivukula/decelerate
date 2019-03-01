# decelerate
This library provides an extendable spreadsheet parser.
## Internal API
Data accessors for directories of workbooks of sheets of rows/columns of cells.
### Directory
`test`
### Workbook
`test`
### Sheet
`test`
### Column/Row
`test`
### Cell
`test`
## External API
Data parsers to define extraction of data from cells from rows/columns from sheets from workbooks from directories.
### Cell
`type CellParser = async (cell: Cell) => Promise<{ [key: string]:  boolean | number | string; }>`
### Column/Row
`type ColumnParser = async (column: Column) => Promise<{ [key: string]:  CellBoundParser[]; }>`
`type RowParser = async (row: Row) => Promise<{ [key: string]:  CellBoundParser[]; }>`
### Sheet
`type SheetParser = async (sheet: Sheet) => Promise<{ [key: string]:  ColumnBoundParser[] | RowBoundParser[]; }>`
### Workbook
`type WorkbookParser = async (workbook: Workbook) => Promise<{ [key: string]:  SheetBoundParser[]; }>`
### Directory
`type DirectoryParser = async (directory: Directory) => Promise<{ [key: string]:  WorkbookBoundParser[]; }>`
## CLI
`npx decelerate --directory ROOT_DIRECTORY --parser ROOT_PARSER`
### Root Directory
The directory within which all target spreadsheets are.
### Root Parser
The `DirectoryParser` default export of the `.ts` module.
### Output
`JSON` results from the actualized parse tree.
