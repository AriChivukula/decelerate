import "mocha";

import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";

import {
  demoCell,
} from "./demo";

chai.use(chaiAsPromised);

describe(
  "cell",
  async () => {
    it(
      "boolean",
      async () => {
        chai.expect(demoCell().toBoolean()).to.deep.equal(false);
      },
    );

    it(
      "number",
      async () => {
        chai.expect(demoCell().toNumber()).to.deep.equal(0);
      },
    );

    it(
      "string",
      async () => {
        chai.expect(demoCell().toString()).to.deep.equal("");
      },
    );
  },
);
