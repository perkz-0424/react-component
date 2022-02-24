import * as React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
  useParams,
  useRoutes,
  Navigate,
} from "react-router-dom";
import createStores from "@/store/models";
import {Provider} from "react-redux";
import Auth from "@/auth";
import {getSearchToParams} from "@/common/assect/util";
import {memo, useMemo} from "react";

class RouteOptions {
  path!: string;
  Component!: (props: any) => React.ReactElement;
  realPath?: string;
  children?: RouteOptions[];
  stores?: any[];
  params?: string[];
  redirect?: string;
}

const getPath = (item: RouteOptions) => {
  const {path, params} = item;
  const _params = params && params.length ? `:${params.join(":/")}` : "";
  const newPath = path.replace("/", "");
  return _params ? `${newPath}/${_params}/*` : `${newPath}/*`;
};

const getNewRouters = (array: Array<RouteOptions>): Array<RouteOptions> => {
  return array.map((o_o: any) => {
    return {
      ...o_o,
      realPath: o_o.path,
      path: getPath(o_o),
      children: o_o.children && o_o.children.length
        ? getNewRouters(o_o.children)
        : null,
    };
  });
};

const getStore = (stores: any) => {
  const items: any = {};
  stores.forEach((item: any) => {
    items[item.namespace] = item;
  });
  return createStores({...items});
};

const renderRoutes = (o_o: Array<RouteOptions>, routers: any) => {
  const o = window.location.search;
  return <Routes>
    {o_o.map(
      ({Component, path, realPath, children, stores}) => {
        const C = memo(Component);
        const A = Auth(() => <C
          routerHistory={{
            navigate: useNavigate(),
            location: useLocation(),
            params: useParams(),
            useRoutes: useRoutes,
            searchParams: getSearchToParams(useLocation().search),
            routers,
          }}
          childrenRouter={children ? () => renderRoutes(children, routers) : null}
          path={realPath}
        />);
        return <Route
          key={path}
          path={path}
          element={stores ?
            <Provider store={getStore(stores)}>
              {useMemo(() => <A/>, [A])}
            </Provider> :
            <>{useMemo(() => <A/>, [A])}</>}
        />;
      })}
    {o_o.map(({realPath, redirect}, index) => {
      return redirect ? <Route
        key={index}
        path={realPath}
        element={
          <Navigate to={`${redirect}${o}`}/>
        }/> : null;
    })}
    <Route path={"*"} element={<Navigate to={`/${o}`}/>}/>
  </Routes>;
};

const CreateRouter = (props: any) => {
  return (
    <React.Fragment>
      <BrowserRouter>
        {renderRoutes(getNewRouters(props.routers), props.routers)}
      </BrowserRouter>
    </React.Fragment>
  );
};

export default CreateRouter;

