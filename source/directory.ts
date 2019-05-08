import {
  promises,
} from "fs";
import {
  basename,
  join,
} from "path";
import {
  read,
} from "xlsx";

import {
  ICanExportAndExplain,
  ITarget,
  HasTargets,
  TExplained,
} from "./common";
import {
  Workbook,
  WorkbookParser,
} from "./workbook";

export type DirectoryParser = (directory: IDirectory) => Promise<void>;

export interface IDirectory {
  bindToSubDirectory(name: string | RegExp, parser: DirectoryParser): this;
  bindToWorkbook(name: string | RegExp, parser: WorkbookParser): this;
}

export interface IDirectoryTarget extends ITarget {
  readonly name: string | RegExp;
}

export interface IDirectoryDirectoryTarget extends IDirectoryTarget {
  kind: "Directory";
  readonly parser: DirectoryParser;
}

export interface IDirectoryWorkbookTarget extends IDirectoryTarget {
  kind: "Workbook";
  readonly parser: WorkbookParser;
}

export class Directory extends HasTargets<IDirectoryDirectoryTarget | IDirectoryWorkbookTarget> implements IDirectory {
  constructor(
    private readonly path: string,
  ) {
    super();
  }

  bindToSubDirectory(name: string | RegExp, parser: DirectoryParser): this {
    this.addTarget({
      name,
      parser,
      kind: "Directory",
    });
    return this;
  }

  bindToWorkbook(name: string | RegExp, parser: WorkbookParser): this {
    this.addTarget({
      name,
      parser,
      kind: "Workbook",
    });
    return this;
  }

  protected async explain(): Promise<void> {
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    const promiseArray = [];
    for (const target of this.getTargets()) {
      switch (target.kind) {
        case "Directory":
          const subdirs = await this.getMatchingSubDirectories(target.name);
          for (const subdir of subdirs) {
            promiseArray.push((async () => {
              const directory = new Directory(join(this.path, subdir));
              await target.parser(directory);
              finalTargets[subdir] = await directory.explain();
            })());
          }
          break;
        case "Workbook":
          const files = await this.getMatchingFiles(target.name);
          for (const file of files) {
            promiseArray.push((async () => {
              const data = await promises.readFile(join(this.path, file));
              const workbook = new Workbook(read(data));
              await target.parser(workbook);
              finalTargets[file] = await workbook.explain();
            })());
          }
          break;
      }
    }
    await Promise.all(promiseArray);
    return finalTargets;
  }
  
  private async getMatchingSubDirectories(nameMatch: string | RegExp): Promise<string[]> {
    return await this.getMatching(nameMatch, false);
  }
  
  private async getMatchingFiles(nameMatch: string | RegExp): Promise<string[]> {
    return await this.getMatching(nameMatch, true);
  }
  
  private async getMatching(nameMatch: string | RegExp, isFile: boolean): Promise<string[]> {
    // @ts-ignore
    let paths = await promises.readdir(this.path, {withFileTypes: true});
    let matches: string[] = [];
    for (let dirent of paths) {
      if (isFile && !dirent.isFile()) {
        continue;
      }
      if (!isFile && !dirent.isDirectory()) {
        continue;
      }
      const endName = basename(dirent.name);
      if (typeof nameMatch === "string") {
        if (endName === nameMatch) {
          matches.push(endName);
        }
      } else {
        if (endName.match(nameMatch)) {
          matches.push(endName);
        }
      }
    }
    return matches;
  }
}
