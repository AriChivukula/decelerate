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
  "export",
  () => {
    const listExample = {
      "A:25": false,
      "B:26": 0,
      "B:27": 0,
      "C:28": "",
      "D:29": "test",
      "D:30": "test",
    };

    const sheetExample = {
      "0:25": listExample,
      "M:25": listExample,
      "N:26": listExample,
      "N:27": listExample,
      "P:26": listExample,
      "P:27": listExample,
      "Q:35:35": false,
    };

    const workbookExample = {
      "Harm Details": sheetExample,
      "Harm Details (2)": sheetExample,
      "Other Questions": sheetExample,
    };

    const directoryExample = {
      "fake_client_a.xlsx": workbookExample,
       "sub": {
        "fake_client_b.xlsx": workbookExample,
        "fake_client_c.xlsx": workbookExample,
      },
    };

    it(
      "directory",
      async () => {
        const directoryExport = await demoDirectory().export();
        chai.expect(directoryExport).to.deep.equal(directoryExample);
      },
    );

    it(
      "workbook",
      async () => {
        const workbookExport = await demoWorkbook().export();
        chai.expect(workbookExport).to.deep.equal(workbookExample);
      },
    );

    it(
      "sheet",
      async () => {
        const sheetExport = await demoSheet().export();
        chai.expect(sheetExport).to.deep.equal(sheetExample);
      },
    );

    it(
      "column",
      async () => {
        const columnExport = await demoColumn().export();
        chai.expect(columnExport).to.deep.equal(listExample);
      },
    );

    it(
      "row",
      async () => {
        const rowExport = await demoRow().export();
        chai.expect(rowExport).to.deep.equal(listExample);
      },
    );
  },
);
