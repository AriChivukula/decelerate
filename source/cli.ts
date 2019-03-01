import * as yargs from "yargs";

import {
  noop,
} from "./index";

yargs
  .usage(
    "$0",
    true,
    (y: yargs.Argv<any>): yargs.Argv<any> => y,
    (argv: yargs.Arguments<any>): void => {
      noop();
    },
  )
  .help()
  .argv;
