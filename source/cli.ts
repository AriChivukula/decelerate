import * as yargs from "yargs";

import {
  Directory,
  DirectoryParser,
} from "./directory";

yargs
  .usage(
    "$0",
    true,
    (y: yargs.Argv<any>): yargs.Argv<any> => y
      .option(
        "directory",
        {
          demandOption: true,
          describe: "Root Data Path",
        },
      )
      .option(
        "parser",
        {
          demandOption: true,
          describe: "Root Parser Path",
        },
      ),
    entryPoint,
  )
  .help()
  .argv;

export async function entryPoint(argv: yargs.Arguments<any>): Promise<void> {
  const directory = new Directory(argv.directory);
  const mod: { [key: string]: any } = require(`${process.cwd()}/${argv.parser}`);
  console.log(mod);
  await mod[""](directory);
  const exported = await directory.export();
  console.log(exported);
}
