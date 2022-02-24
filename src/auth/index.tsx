import * as React from "react";

// 权限
const Auth = (Component: (props: any) => React.ReactElement) => {
  return (props:any) => <Component {...props}/>;
};
export default Auth;
