import "mocha";

import * as chai from "chai";
import {
  chaiAsPromised
} from "chai-as-promised";

import {
  noop,
} from "../source/index";

chai.use(chaiAsPromised);

it(
  "noop",
  () => {
    noop();
  },
);
