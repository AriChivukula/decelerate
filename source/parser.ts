/* EXPERIMENTAL */

import * as yargs from "yargs";
import {
  promises,
} from "fs";

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
  for (const client of clients) {
    console.log(client.name);
  }
}

class Client {
  constructor(
    readonly name: string,
    readonly data: any,
  ) {
  }

  countryOfOrigin(): string {
    return "";
  }

  experiencedHealthIssues(): string[] {
    return [];
  }

  experiencedHarmTypes(): string[] {
    return [];
  }

  experiencedHarmActors(): string[] {
    return [];
  }
}
