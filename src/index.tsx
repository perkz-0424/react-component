import * as React from "react";
import * as ReactDOM from "react-dom";
import CreateRouter from "@/routers/CreateRouter";
import routers from "@/routers";
import globalStore from "@/store";
import {Provider} from "react-redux";
import zhCN from "antd/lib/locale/zh_CN";
import {ConfigProvider} from "antd";
import "antd/dist/antd.css"
// import "antd/dist/antd.css";


const App = () => {
  return (
    <React.Fragment>
      <Provider store={globalStore}>
        <ConfigProvider locale={zhCN}>
          <CreateRouter routers={routers}/>
        </ConfigProvider>
      </Provider>
    </React.Fragment>
  );
};

ReactDOM.render(<App/>, document.getElementById("root") as HTMLDivElement);
