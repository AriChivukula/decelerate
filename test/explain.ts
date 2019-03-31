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
    it(
      "directory",
      async () => {
        const directoryExplain = await demoDirectory().explain();
        chai.expect(directoryExplain).to.deep.equal({
          parser: "Directory",
          inner: {},
        });
      },
    );

    it(
      "workbook",
      async () => {
        const workbookExplain = await demoWorkbook().explain();
        chai.expect(workbookExplain).to.deep.equal({
          parser: "Workbook",
          inner: {},
        });
      },
    );

    it(
      "sheet",
      async () => {
        const sheetExplain = await demoSheet().explain();
        chai.expect(sheetExplain).to.deep.equal({
          parser: "Sheet",
          inner: {},
        });
      },
    );

    it(
      "column",
      async () => {
        const columnExplain = await demoColumn().explain();
        chai.expect(columnExplain).to.deep.equal({
          parser: "Column",
          inner: {
            "rowA:0": null,
            "rowB:1": null,
            "rowB:2": null,
          },
        });
      },
    );

    it(
      "row",
      async () => {
        const rowExplain = await demoRow().explain();
        chai.expect(rowExplain).to.deep.equal({
          parser: "Row",
          inner: {
            "rowA:0": null,
            "rowB:1": null,
            "rowB:2": null,
          },
        });
      },
    );
  },
);
