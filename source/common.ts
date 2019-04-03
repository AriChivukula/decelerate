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
  
  abstract explain(): Promise<TExplained>;
  
  abstract export(): Promise<TExported>;
}
