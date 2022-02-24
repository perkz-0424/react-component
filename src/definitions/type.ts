import * as React from "react";

export type Dispatch<P = any, C = (payload: P) => void> = (action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export class StateMain {
  public loading?: boolean;
  public info?: any;
  public menus?: any[];
  public authKeys?: any[];
  public menusList?: any[];
  public collapsed?: boolean;
  public visible?: boolean;
  public user?: any;
  public headImage?: any[];
  public nPassword?: string;
  public rPassword?: string;
  public page?: string;
  public area?: any[];
}

export interface IReactComponent<T = any> {
  (props: T): React.ReactElement;
}
