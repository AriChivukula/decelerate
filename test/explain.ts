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

    const sheetExample = {
      "parser": "Sheet",
      "inner": {
        "0:0": rowExample,
        "M:0": columnExample,
        "N:1": columnExample,
        "N:2": columnExample,
        "P:1": rowExample,
        "P:2": rowExample,
      },
    };

    it(
      "sheet",
      async () => {
        const sheetExplain = await demoSheet().explain();
        chai.expect(sheetExplain).to.deep.equal(sheetExample);
      },
    );
    
    const columnExample = {
      "parser": "Column",
      "inner": {
        "A:0": null,
        "B:1": null,
        "B:2": null,
      },
    };

    it(
      "column",
      async () => {
        const columnExplain = await demoColumn().explain();
        chai.expect(columnExplain).to.deep.equal(columnExample);
      },
    );
    
    const rowExample = {
      "parser": "Row",
      "inner": {
        "A:0": null,
        "B:1": null,
        "B:2": null,
      },
    };

    it(
      "row",
      async () => {
        const rowExplain = await demoRow().explain();
        chai.expect(rowExplain).to.deep.equal(rowExample);
      },
    );
  },
);
