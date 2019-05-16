import * as yargs from "yargs";
import {
  promises,
} from "fs";

interface Client {
  client_name: string;
  country_of_origin: string;
  has_ptsd: boolean;
  has_depression: boolean;
  has_anxiety: boolean;
  has_other: boolean;
  was_raped: boolean;
  was_raped_as_a_child: boolean;
  was_sexually_abused: boolean;
  was_sexually_abused_as_a_child: boolean;
  was_physically_harmed: boolean;
  was_physically_harmed_as_a_child: boolean;
  was_harmed_by_state_actor: boolean;
  was_harmed_by_police: boolean;
}

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
    clients.push(makeClient(clientName, json[clientName]));
  }
  let didPrintFirst = false;
  for (const client of clients) {
    if (!didPrintFirst) {
      console.log(Object.keys(client).join(","));
      didPrintFirst = true;
    }
    console.log(Object.values(client).join(","));
  }
}

function makeClient(client_name: string, data: any): Client {
  return {
    client_name,
    country_of_origin: getCountryOfOrigin(data),
    has_ptsd: false, // TODO
    has_depression: false, // TODO
    has_anxiety: false, // TODO
    has_other: false, // TODO
    was_raped: false, // TODO
    was_raped_as_a_child: false, // TODO
    was_sexually_abused: false, // TODO
    was_sexually_abused_as_a_child: false, // TODO
    was_physically_harmed: false, // TODO
    was_physically_harmed_as_a_child: false, // TODO
    was_harmed_by_state_actor: false, // TODO
    was_harmed_by_police: false, // TODO
  };
}

function getCountryOfOrigin(data: any) {
  const country = getSubData(data, "Other Questions", "country_of_origin:5:9");
  if (country === null) {
    throw Error("missing country");
  }
  return mapDatum(
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

function getSubData(data: any, ...idxs: string[]): any {
  for (const idx of idxs) {
    if (idx in data) {
      data = data[idx];
    } else {
      return null;
    }
  }
  return data;
}

function mapDatum<T>(datum: string, map: {[idx: string]: T}): T {
  if (datum in map) {
    return map[datum];
  } else {
    throw Error(datum + " not found");
  }
}

/*
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
*/
