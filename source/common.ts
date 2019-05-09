export type TExplained = {
  parser: string;
  inner: {
    [k: string]: TExplained;
  };
  value?: TExported;
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

export interface ICanCollapse {
  collapse(seperator: string): this;
}

export interface ICanFilterEmpty {
  filterEmpty(): this;
}

export abstract class HasTargets<T extends ITarget> implements ICanExportAndExplain {
  private targets: T[] = [];

  protected addTarget(target: T): void {
    this.targets.push(target);
  }

  protected getTargets(): T[] {
    return this.targets;
  }
  
  abstract explain(): Promise<TExplained>;

  async export(): Promise<TExported> {
    const explained = await this.explain();
    return this.exportImpl(explained);
  }
  
  private exportImpl(explained: TExplained): TExported {
    if ("value" in explained) {
      return explained.value as TExported;
    }
    const exported: TExported = {};
    for (const key in explained.inner) {
      exported[key] = this.exportImpl(explained.inner[key]);
    }
    return exported;
  }
}

export abstract class HasTargetsAndCanCollapse<T extends ITarget> extends HasTargets<T> implements ICanCollapse {
  protected shouldCollapse = false;
  protected seperator = "";

  collapse(seperator: string): this {
    this.shouldCollapse = true;
    this.seperator = seperator;
    return this;
  }
}

export abstract class HasTargetsAndCanFilterEmpty<T extends ITarget> extends HasTargets<T> implements ICanFilterEmpty {
  protected shouldFilterEmpty = false;

  filterEmpty(): this {
    this.shouldFilterEmpty = true;
    return this;
  }
}
