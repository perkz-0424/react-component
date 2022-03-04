import * as React from "react";

export class RouteOptions {
  path!: string;
  Component!: (props: any) => React.ReactElement;
  realPath?: string;
  children?: RouteOptions[];
  stores?: any[];
  params?: string[];
  redirect?: string;
}

export type RouterHistory = {
  location: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: { [key: string]: any } | null | string;
    [key: string]: any
  },
  navigate: (to: string, options: { [key: string]: any }) => any
  params: {
    [key: string]: string;
  };
  routers: RouteOptions;
  searchParams: {
    [key: string]: string;
  };
  useRoutes: () => any;
}
export type MapRoute = {
  path: string;
  childrenRouter: (() => React.ReactElement) | null;
  routerHistory: RouterHistory;
}
