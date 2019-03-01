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
### CellParser
`test`
### ColumnParser/RowParser
`test`
### SheetParser
`test`
### WorkbookParser
`test`
### DirectoryParser
`test`
## CLI
`npx decelerate --directory ROOT_DIRECTORY --parser ROOT_PARSER`
### Root Directory
The directory within which all target spreadsheets are.
### Root Parser
The `DirectoryParser` default export of the `.ts` module.
