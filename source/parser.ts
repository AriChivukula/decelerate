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
    clients.push(new Client(clientName, json[clientName]));
  }
  for (const client of clients) {
    console.log(client.name + "," + client.countryOfOrigin() + "," + client.experiencedHealthIssues().join("/") + "," + client.experiencedHarmTypes().join("/"));
  }
}

class Client {
  constructor(
    readonly name: string,
    readonly data: any,
  ) {
  }

  countryOfOrigin(): string {
    const country = this.getSubData("Other Questions", "country_of_origin:5:9");
    if (country === null) {
      throw Error(this.name + " missing country");
    }
    return this.mapData(
      country,
      {
        "Brazil": "BR",
        "Colombia": "CO",
        "Guatemala": "GT",
        "Honduras": "HN",
        "Kenya": "KE",
        "Macedonia": "MK",
        "Burma": "MM",
        "Mexico": "MX",
        "Meixco": "MX",
        "El Salvador": "SV",
        "Uganda": "UG",
        "Venezuela": "VE",
      },
    );
  }

  experiencedHealthIssues(): string[] {
    const healthIssues: string[] = [];
    if (this.getSubData("Other Questions", "mental_health_diagnosis:3", "anxiety:6") ||
        this.getSubData("Other Questions", "mental_health_diagnosis:4", "anxiety:6")) {
      healthIssues.push("ANXIETY");
    }
    if (this.getSubData("Other Questions", "mental_health_diagnosis:3", "depression:7") ||
        this.getSubData("Other Questions", "mental_health_diagnosis:4", "depression:7")) {
      healthIssues.push("DEPRESSION");
    }
    if (this.getSubData("Other Questions", "mental_health_diagnosis:3", "other:8") ||
        this.getSubData("Other Questions", "mental_health_diagnosis:4", "other:8")) {
      healthIssues.push("OTHER");
    }
    if (this.getSubData("Other Questions", "mental_health_diagnosis:3", "ptsd:5") ||
        this.getSubData("Other Questions", "mental_health_diagnosis:4", "ptsd:5")) {
      healthIssues.push("PTSD");
    }
    return healthIssues;
  }

  experiencedHarmTypes(): string[] {
    const harmTypes: Set<string> = new Set([]);
    for (const sheetName in this.data) {
      if (!sheetName.includes("Harm Details")) {
        continue;
      }
      for (const rowName in this.data[sheetName]) {
        const localHarmTypes = this.mapData(
          this.getSubData(sheetName, rowName, "type:1"),
          {
            "DI": ["DI"],
            "HR": ["HR"],
            "PH": ["PH"],
            "PA": ["PH"],
            "RA": ["RA"],
            "SA/RA": ["SA", "RA"],
            "SA": ["SA"],
            "TSH/SA": ["TSH", "SA"],
            "TA": ["SA"],
            "TSH": ["TSH"],
          },
        );
        for (const harmType of localHarmTypes) {
          harmTypes.add(harmType);
        }
      }
    }
    return Array.from(harmTypes);
  }

  private getSubData(...idxs: string[]): any {
    let data: any = this.data;
    for (const idx of idxs) {
      if (idx in data) {
        data = data[idx];
      } else {
        return null;
      }
    }
    return data;
  }

  private mapData(data: string, map: {[idx: string]: any}): any {
    if (data in map) {
      return map[data];
    } else {
      throw Error(data + " not found");
    }
  }
}
