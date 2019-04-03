export type TExplained = {
  parser: string;
  inner: {
    [k: string]: TExplained | null;
  };
};

export type TExported = {
  [k: string]: TExported | boolean | number | string;
};

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
  
  abstract protected explore(
    appendToOutput: (key: string, value: HasTargets<ITarget>) => Promise<void>,
  ): Promise<void>;

  async explain(): Promise<TExplained> {
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    await this.explore(
      async (key: string, value: HasTargets<ITarget>): Promise<void> => {
        finalTargets.inner[key] = await value.explain();
      },
    );
    return finalTargets;
  }

  async export(): Promise<TExported> {
    const finalTargets: TExported = {};
    await this.explore(
      async (key: string, value: HasTargets<ITarget>): Promise<void> => {
        finalTargets[key] = await value.export();
      },
    );
    return finalTargets;
  }
}
