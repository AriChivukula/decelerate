import {
  promises,
} from "fs";
import {
  basename,
  join,
} from "path";

import {
  CanBeExplained,
  CanBeExported,
  TExplained,
  TExported,
  ITarget,
  HasTargets,
} from "./common";
import {
  Workbook,
  WorkbookParser,
} from "./workbook";

export type DirectoryParser = (directory: IDirectory) => Promise<void>;

export interface IDirectory {
  bindToSubDirectory(name: string, parser: DirectoryParser): this;
  bindToSubDirectories(match: RegExp, parser: DirectoryParser): this;
  bindToWorkbook(name: string, parser: WorkbookParser): this;
  bindToWorkbooks(match: RegExp, parser: WorkbookParser): this;
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

export type TDirectoryTarget = IDirectoryDirectoryTarget | IDirectoryWorkbookTarget;

export class Directory extends HasTargets<TDirectoryTarget> implements IDirectory, CanBeExplained, CanBeExported {
  constructor(
    private readonly path: string,
  ) {
    super();
  }

  bindToSubDirectory(name: string, parser: DirectoryParser): this {
    this.addTarget({
      name,
      parser,
      kind: "Directory",
    });
    return this;
  }

  bindToSubDirectories(name: RegExp, parser: DirectoryParser): this {
    this.addTarget({
      name,
      parser,
      kind: "Directory",
    });
    return this;
  }

  bindToWorkbook(name: string, parser: WorkbookParser): this {
    this.addTarget({
      name,
      parser,
      kind: "Workbook",
    });
    return this;
  }

  bindToWorkbooks(name: RegExp, parser: WorkbookParser): this {
    this.addTarget({
      name,
      parser,
      kind: "Workbook",
    });
    return this;
  }

  protected async explore(
    appendToOutput: (key: string, target: TDirectoryTarget, value: HasTargets<TDirectoryTarget>) => Promise<void>,
  ): Promise<void> {
    for (const target of this.getTargets()) {
      switch (target.kind) {
        case "Directory":
          const subdirs = await this.getMatchingSubDirectories(target.name);
          for (const subdir of subdirs) {
            await appendToOutput(
              subdir,
              target,
              new Directory(join(this.path, subdir)),
            );
          }
          break;
        case "Workbook":
          const files = await this.getMatchingFiles(target.name);
          for (const file of files) {
            await appendToOutput(
              subdir,
              target,
              new Workbook(join(this.path, file)),
            );
          }
          break;
      }
    }
  }

  async explain(): Promise<TExplained> {
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    await this.explore(
      async (key: string, target: TDirectoryTarget, value: HasTargets<TDirectoryTarget>): Promise<void> => {
        await target.parser(value);
        finalTargets.inner[key] = await value.explain();
      },
    );
    return finalTargets;
  }

  async export(): Promise<TExported> {
    const finalTargets: TExported = {};
    await this.explore(
      async (key: string, target: TDirectoryTarget, value: HasTargets<TDirectoryTarget>): Promise<void> => {
        await target.parser(value);
        finalTargets[key] = await value.export();
      },
    );
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
