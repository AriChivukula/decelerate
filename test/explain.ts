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
    const cellExample = {
      "parser": "Cell",
      "inner": {},
    };

    const rowExample = {
      "parser": "Row",
      "inner": {
        "A:25": cellExample,
        "B:26": cellExample,
        "B:27": cellExample,
        "C:28": cellExample,
        "D:29": cellExample,
        "D:30": cellExample,
      },
    };

    const columnExample = {
      "parser": "Column",
      "inner": {
        "A:25": cellExample,
        "B:26": cellExample,
        "B:27": cellExample,
        "C:28": cellExample,
        "D:29": cellExample,
        "D:30": cellExample,
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
