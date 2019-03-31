export type TExplained = {
  parser: string;
  inner: {
    [k: string]: TExplained | null;
  };
};

export interface CanBeExplained {
  explain(): TExplained;
}

export type TExported = {
  [k: string]: TExported | boolean | number | string;
};

export interface CanBeExported {
  export(): TExported;
}

export interface ITarget {
  readonly name: string;
}

export abstract class HasTargets<T extends ITarget> {
  protected targets: T[] = [];

  protected addTarget(target: T): void {
    this.targets.push(target);
  }
}
