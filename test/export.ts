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
      () => {
        const directory = new Directory();
        chai.expect(directory.export()).to.deep.equal({});
      },
    );

    it(
      "workbook",
      () => {
        const workbook = new Workbook();
        chai.expect(workbook.export()).to.deep.equal({});
      },
    );

    it(
      "sheet",
      () => {
        const sheet = new Sheet();
        chai.expect(sheet.export()).to.deep.equal({});
      },
    );

    it(
      "column",
      () => {
        const column = new Column();
        chai.expect(column.export()).to.deep.equal({});
      },
    );

    it(
      "row",
      () => {
        const row = new Row();
        chai.expect(row.export()).to.deep.equal({});
      },
    );
  },
);
