import * as yargs from "yargs";

import {
} from "./index";

yargs
  .usage(
    "$0",
    true,
    (y: yargs.Argv<any>): yargs.Argv<any> => y,
    entryPoint,
  )
  .help()
  .argv;

export async function entryPoint(argv: yargs.Arguments<any>): Promise<void> {
}
