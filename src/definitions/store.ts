export type StoreState = {
  [key: string]: string | number | boolean | { [key: string]: StoreState } | StoreState[]
}

export type StoreMap<T = any> = {
  namespace: string;
  state: StoreState;
  reducers: {
    [key: string]: (state: StoreState, params: T) => StoreState
  }
}
export type StoreStores = {
  [key: string]: StoreMap;
};

export type StoreReducers<T = any> = {
  [key: string]: T
}
