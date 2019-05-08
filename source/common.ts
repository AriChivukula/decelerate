export type TExplained = {
  parser: string;
  inner: {
    [k: string]: TExplained;
  };
  value?: boolean | number | string;
};

export type TExported = {
  [k: string]: TExported;
} | boolean | number | string;

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
  
  protected abstract explore(
    target: T,
    appendToOutput: (key: string, value: ICanExportAndExplain) => Promise<void>,
  ): Promise<void>;

  async explain(): Promise<TExplained> {
    const finalTargets: TExplained = {
      parser: this.constructor.name,
      inner: {},
    };
    const appendToTarget = async (key: string, value: ICanExportAndExplain): Promise<void> => {
      finalTargets.inner[key] = await value.explain();
    };
    const promises = [];
    for (const target of this.getTargets()) {
      promises.push(this.explore(target, appendToTarget));
    }
    await Promise.all(promises);
    return finalTargets;
  }

  async export(): Promise<TExported> {
    const explained = await this.explain();
    return this.exportImpl(explained);
  }
  
  private exportImpl(explained: TExplained): TExported {
    if ("inner" in explained) {
      const exported: TExported = {};
      for (const key in explained.inner) {
        exported[key] = this.exportImpl(explained.inner[key]);
      }
      return exported;
    }
    if ("value" in explained) {
      return explained.value;
    }
    throw new Error("Unreachable");
  }
}
