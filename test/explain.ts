import "mocha";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

import {
  Directory,
} from "../source/directory";
import {
  Workbook,
} from "../source/workbook";
import {
  Sheet,
} from "../source/sheet";
import {
  Column,
} from "../source/column";
import {
  Row,
} from "../source/row";

chai.use(chaiAsPromised);

describe(
  "explain",
  async () => {
    it(
      "directory",
      async () => {
        const directory = new Directory();
        const directoryExplain = await directory.explain();
        chai.expect(directoryExplain).to.deep.equal({
          parser: "Directory",
          inner: {},
        });
      },
    );

    it(
      "workbook",
      async () => {
        const workbook = new Workbook();
        const workbookExplain = await workbook.explain();
        chai.expect(workbookExplain).to.deep.equal({
          parser: "Workbook",
          inner: {},
        });
      },
    );

    it(
      "sheet",
      async () => {
        const sheet = new Sheet();
        const sheetExplain = await sheet.explain();
        chai.expect(sheetExplain).to.deep.equal({
          parser: "Sheet",
          inner: {},
        });
      },
    );

    it(
      "column",
      async () => {
        const column = new Column();
        const columnExplain = await column.explain();
        chai.expect(columnExplain).to.deep.equal({
          parser: "Column",
          inner: {},
        });
      },
    );

    it(
      "row",
      async () => {
        const row = new Row();
        const rowExplain = await row.explain();
        chai.expect(rowExplain).to.deep.equal({
          parser: "Row",
          inner: {},
        });
      },
    );
  },
);
