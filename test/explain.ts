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
            inner: {
              "0:0": {
                "inner": {
                  "A:0": null,
                  "B:1": null,
                  "B:2": null,
                },
                "parser": "Row",
              },
              "M:0": {
                "inner": {
                  "A:0": null,
                  "B:1": null,
                  "B:2": null,
                },
                "parser": "Column",
              },
              "N:1": {
                "inner": {
                  "A:0": null,
                  "B:1": null,
                  "B:2": null,
                },
                "parser": "Column",
              },
              "N:2": {
                "inner": {
                  "A:0": null,
                  "B:1": null,
                  "B:2": null,
                },
                "parser": "Column",
              },
              "P:1": {
                "inner": {
                  "A:0": null,
                  "B:1": null,
                  "B:2": null,
                },
                "parser": "Row",
              },
              "P:2": {
                "inner": {
                  "A:0": null,
                  "B:1": null,
                  "B:2": null,
                },
                "parser": "Row",
              },
            },
          },
        });
      },
    );

    it(
      "column",
      async () => {
        const columnExplain = await demoColumn().explain();
        chai.expect(columnExplain).to.deep.equal({
          "parser": "Column",
          "inner": {
            "A:0": null,
            "B:1": null,
            "B:2": null,
          },
        });
      },
    );

    it(
      "row",
      async () => {
        const rowExplain = await demoRow().explain();
        chai.expect(rowExplain).to.deep.equal({
          "parser": "Row",
          "inner": {
            "A:0": null,
            "B:1": null,
            "B:2": null,
          },
        });
      },
    );
  },
);
