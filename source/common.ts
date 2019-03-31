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

export abstract class HasTargets<T extends IHasTargets> {
  protected targets: { [k: string]: T } = {};

  protected addTarget(target: T): void {
    if (target.name in this.targets) {
      throw new Error("Target name cannot be duplicated: " + target.name);
    }
    this.targets[target.name] = target;
  }
}
