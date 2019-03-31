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

    it(
      "sheet",
      async () => {
        const sheetExport = await demoSheet().export();
        chai.expect(sheetExport).to.deep.equal({});
      },
    );

    it(
      "column",
      async () => {
        const columnExport = await demoColumn().export();
        chai.expect(columnExport).to.deep.equal({
          "rowA:0": "test",
          "rowB:1": "test",
          "rowB:2": "test",
        });
      },
    );

    it(
      "row",
      async () => {
        const rowExport = await demoRow().export();
        chai.expect(rowExport).to.deep.equal({
          "rowA:0": "test",
          "rowB:1": "test",
          "rowB:2": "test",
        });
      },
    );
  },
);
