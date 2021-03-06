import * as yargs from "yargs";

import {
  TExported,
} from "./common";
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
  sortAndPrintMap(exported);
}

function sortAndPrintMap(exported: TExported, indent: number = 0, hasNext: boolean = false): void {
  if (typeof exported === "boolean" || typeof exported === "number" || typeof exported === "string") {
    process.stdout.write(JSON.stringify(exported) + (hasNext ? "," : "") + "\n");
  } else {
    process.stdout.write("  ".repeat(indent) + "{\n");
    indent++;
    Object.keys(exported).sort().forEach((key, idx, arr) => {
      process.stdout.write("  ".repeat(indent) + JSON.stringify(key) + ": ");
      sortAndPrintMap(exported[key], indent, arr.length - 1 !== idx)
    });
    indent--;
    process.stdout.write("  ".repeat(indent) + "}" + (hasNext ? "," : "") + "\n");
  }
}
