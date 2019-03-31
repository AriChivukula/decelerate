import * as yargs from "yargs";

import {
} from "./index";

yargs
  .usage(
    "$0",
    true,
    (y: yargs.Argv<any>): yargs.Argv<any> => y,
    async (argv: yargs.Arguments<any>): Promise<void> => {
      entry();
    },
  )
  .help()
  .argv;

export async function entry(): Promise<void> {
}
