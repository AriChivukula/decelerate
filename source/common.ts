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
