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
  readonly name: string;
}

export abstract class HasTargets<T extends ITarget> {
  private targets: T[] = [];

  protected addTarget(target: T): void {
    this.targets.push(target);
  }
  
  abstract getTargetKey(target: T): string;
  
  protected getTargets(): { [k: string]: T } {
    const finalTargets: { [k: string]: T } = {};
    this.targets.forEach((element: T): void => {
      const finalKey = this.getTargetKey(element);
      if (finalKey in finalTargets) {
        throw new Error("Target keys must be unique, duplicate found: " + finalKey);
      }
      finalTargets[finalKey] = element;
    });
    return finalTargets;
  }
}
