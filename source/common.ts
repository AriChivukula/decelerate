import {
  fsPromises,
} from "fs";
import {
  basename,
} from "path";

export type TExplained = {
  parser: string;
  inner: {
    [k: string]: TExplained | null;
  };
};

export interface CanBeExplained {
  explain(): Promise<TExplained>;
}

export type TExported = {
  [k: string]: TExported | boolean | number | string;
};

export interface CanBeExported {
  export(): Promise<TExported>;
}

export interface ITarget {
}

export abstract class HasTargets<T extends ITarget> {
  private targets: T[] = [];

  protected addTarget(target: T): void {
    this.targets.push(target);
  }

  protected getTargets(): T[] {
    return this.targets;
  }

  protected async getMatchingSubDirectories(rootPath: string, nameMatch: string | RegExp): Promise<string[]> {
    return await this.getMatching(rootPath, nameMatch, false);
  }
  
  protected async getMatchingFiles(rootPath: string, nameMatch: string | RegExp): Promise<string[]> {
    return await this.getMatching(rootPath, nameMatch, true);
  }
  
  private async getMatching(rootPath: string, nameMatch: string | RegExp, isFile: boolean): Promise<string[]> {
    let paths = await fsPromises.readdir(rootPath, {withFileTypes: true});
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
