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
  () => {
    it(
      "directory",
      () => {
        const directory = new Directory();
        chai.expect(directory.explain()).to.deep.equal({
          parser: "Directory",
          inner: {},
        });
      },
    );

    it(
      "workbook",
      () => {
        const workbook = new Workbook();
        chai.expect(workbook.explain()).to.deep.equal({
          parser: "Workbook",
          inner: {},
        });
      },
    );

    it(
      "sheet",
      () => {
        const sheet = new Sheet();
        chai.expect(sheet.explain()).to.deep.equal({
          parser: "Sheet",
          inner: {},
        });
      },
    );

    it(
      "column",
      () => {
        const column = new Column();
        chai.expect(column.explain()).to.deep.equal({
          parser: "Column",
          inner: {},
        });
      },
    );

    it(
      "row",
      () => {
        const row = new Row();
        chai.expect(row.explain()).to.deep.equal({
          parser: "Row",
          inner: {},
        });
      },
    );
  },
);
