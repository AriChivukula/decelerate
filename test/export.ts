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
    it(
      "directory",
      async () => {
        const directoryExport = await demoDirectory().export();
        chai.expect(directoryExport).to.deep.equal({});
      },
    );

    it(
      "workbook",
      async () => {
        const workbookExport = await demoWorkbook().export();
        chai.expect(workbookExport).to.deep.equal({});
      },
    );

    const sheetExample = {
      "0:0": listExample,
      "M:0": listExample,
      "N:1": listExample,
      "N:2": listExample,
      "P:1": listExample,
      "P:2": listExample,
    };

    it(
      "sheet",
      async () => {
        const sheetExport = await demoSheet().export();
        chai.expect(sheetExport).to.deep.equal(sheetExample);
      },
    );

    const listExample = {
      "A:0": "test",
      "B:1": "test",
      "B:2": "test",
    };

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
