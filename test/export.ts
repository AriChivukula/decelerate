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
  "export",
  () => {
    it(
      "directory",
      async () => {
        const directory = new Directory();
        const directoryExport = await directory.export();
        chai.expect(directoryExport).to.deep.equal({});
      },
    );

    it(
      "workbook",
      async () => {
        const workbook = new Workbook();
        const workbookExport = await workbook.export();
        chai.expect(workbookExport).to.deep.equal({});
      },
    );

    it(
      "sheet",
      async () => {
        const sheet = new Sheet();
        const sheetExport = await sheet.export();
        chai.expect(sheetExport).to.deep.equal({});
      },
    );

    it(
      "column",
      async () => {
        const column = new Column();
        const columnExport = await column.export();
        chai.expect(columnExport).to.deep.equal({});
      },
    );

    it(
      "row",
      async () => {
        const row = new Row();
        const rowExport = await row.export();
        chai.expect(rowExport).to.deep.equal({});
      },
    );
  },
);
