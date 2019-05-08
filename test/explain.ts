import "mocha";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

import {
  demoDirectory,
  demoWorkbook,
  demoSheet,
  demoColumn,
  demoRow,
} from "./demo";

chai.use(chaiAsPromised);

describe(
  "explain",
  async () => {
    const booleanCellExample = {
      "parser": "Cell",
      "inner": {},
      "value": false,
    };

    const numberCellExample = {
      "parser": "Cell",
      "inner": {},
      "value": 0,
    };

    const stringCellExample = {
      "parser": "Cell",
      "inner": {},
      "value": "",
    };

    const customCellExample = {
      "parser": "Cell",
      "inner": {},
      "value": "test",
    };

    const rowExample = {
      "parser": "Row",
      "inner": {
        "A:25": booleanCellExample,
        "B:26": numberCellExample,
        "B:27": numberCellExample,
        "C:28": stringCellExample,
        "D:29": customCellExample,
        "D:30": customCellExample,
      },
    };

    const columnExample = {
      "parser": "Column",
      "inner": {
        "A:25": booleanCellExample,
        "B:26": numberCellExample,
        "B:27": numberCellExample,
        "C:28": stringCellExample,
        "D:29": customCellExample,
        "D:30": customCellExample,
      },
    };

    const sheetExample = {
      "parser": "Sheet",
      "inner": {
        "0:25": rowExample,
        "M:25": columnExample,
        "N:26": columnExample,
        "N:27": columnExample,
        "P:26": rowExample,
        "P:27": rowExample,
        "Q:35:35": booleanCellExample,
      },
    };

    const workbookExample = {
      "parser": "Workbook",
      "inner": {
        "Harm Details": sheetExample,
        "Harm Details (2)": sheetExample,
        "Other Questions": sheetExample,
      },
    };

    const directoryExample = {
      "parser": "Directory",
      "inner": {
        "fake_client_a.xlsx": workbookExample,
        "sub": {
          "parser": "Directory",
          "inner": {
            "fake_client_b.xlsx": workbookExample,
            "fake_client_c.xlsx": workbookExample,
          },
        },
      },
    };

    it(
      "directory",
      async () => {
        const directoryExplain = await demoDirectory().explain();
        chai.expect(directoryExplain).to.deep.equal(directoryExample);
      },
    );

    it(
      "workbook",
      async () => {
        const workbookExplain = await demoWorkbook().explain();
        chai.expect(workbookExplain).to.deep.equal(workbookExample);
      },
    );

    it(
      "sheet",
      async () => {
        const sheetExplain = await demoSheet().explain();
        chai.expect(sheetExplain).to.deep.equal(sheetExample);
      },
    );

    it(
      "column",
      async () => {
        const columnExplain = await demoColumn().explain();
        chai.expect(columnExplain).to.deep.equal(columnExample);
      },
    );

    it(
      "row",
      async () => {
        const rowExplain = await demoRow().explain();
        chai.expect(rowExplain).to.deep.equal(rowExample);
      },
    );
  },
);
