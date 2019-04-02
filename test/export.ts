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
      "A:0": "test",
      "B:1": "test",
      "B:2": "test",
    };

    const sheetExample = {
      "0:0": listExample,
      "M:0": listExample,
      "N:1": listExample,
      "N:2": listExample,
      "P:1": listExample,
      "P:2": listExample,
    };

    const workbookExample = {
      "/R/": sheetExample,
      "Q": sheetExample,
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
