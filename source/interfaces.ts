export type TExplained = {
  parser: string;
  inner?: {
    [k: string]: TExplained;
  };
};

export interface CanBeExplained {
  explain(): TExplained;
}

export type TExport = {
  [k: string]: Export | boolean | number | string;
};

export interface CanBeExported {
  export(): TExport;
}
