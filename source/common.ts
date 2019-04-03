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

export interface ICanExportAndExplain {
  explain(): Promise<TExplained>;
  export(): Promise<TExported>;
}

export abstract class HasTargets<T extends ITarget> implements ICanExportAndExplain {
  private targets: T[] = [];

  protected addTarget(target: T): void {
    this.targets.push(target);
  }

  protected getTargets(): T[] {
    return this.targets;
  }
  
  abstract protected explore(
    appendToOutput: (key: string, value: ICanExportAndExplain) => Promise<void>,
  ): Promise<void>;

  async explain(): Promise<TExplained> {
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    await this.explore(
      async (key: string, value: ICanExportAndExplain): Promise<void> => {
        finalTargets.inner[key] = await value.explain();
      },
    );
    return finalTargets;
  }

  async export(): Promise<TExported> {
    const finalTargets: TExported = {};
    await this.explore(
      async (key: string, value: ICanExportAndExplain): Promise<void> => {
        finalTargets[key] = await value.export();
      },
    );
    return finalTargets;
  }
}
