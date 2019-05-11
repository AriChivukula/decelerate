/* EXPERIMENTAL */

import * as yargs from "yargs";
import {
  promises,
} from "fs";
import {
  parse,
} from "relaxed-json";

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
      "data",
      {
        demandOption: true,
        describe: "JSON blob",
      },
    );
}

export async function entryPoint(argv: yargs.Arguments<any>): Promise<void> {
  const data: any = await promises.readFile(argv.data, "ascii");
  const json: any = JSON.parse(data);
  const clients: Client[] = [];
  for (const clientName in json) {
    clients.push(new Client(clientName, data[clientName]));
  }
}

class Client {
  constructor(
    private readonly name: string,
    private readonly data: any,
  ) {
    console.log(name);
  }
}
