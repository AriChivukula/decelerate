import * as yargs from "yargs";

import {
  Directory,
  DirectoryParser,
} from "./directory";

yargs
  .usage(
    "$0",
    true,
    argParse,
    entryPoint,
  )
  .help()
  .argv;

export function argParse(y: yargs.Argv<any>): yargs.Argv<any> {
  return y
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
    );
}

export async function entryPoint(argv: yargs.Arguments<any>): Promise<void> {
  const directory = new Directory(argv.directory);
  const mod: { default: DirectoryParser } = require(`${process.cwd()}/${argv.parser}`);
  await mod.default(directory);
  const exported = await directory.export();
  console.log(JSON.stringify(exported));
}
