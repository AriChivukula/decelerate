export interface CanBeExplained {
  explain(): Object;
}

export interface CanBeExported<T> {
  export(): T;
}
