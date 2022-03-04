import * as React from "react";

export type Dispatch<P = any, C = (payload: P) => void> = (action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface IReactComponent<T = any> {
  (props: T): React.ReactElement;
}
