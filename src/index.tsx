import * as React from "react";
import * as ReactDOM from "react-dom";
import CreateRouter from "@/routers/CreateRouter";
import routers from "@/routers";
import globalStore from "@/store";
import {Provider} from "react-redux";
import zhCN from "antd/lib/locale/zh_CN";
import zhCNMobile from "antd-mobile/es/locales/zh-CN";
import {ConfigProvider as ConfigProviderMobile} from "antd-mobile"
import {ConfigProvider} from "antd";
import 'element-theme-default';


const App = () => {
  return (
    <React.Fragment>
      <Provider store={globalStore}>
        <ConfigProvider locale={zhCN}>
          <ConfigProviderMobile locale={zhCNMobile}>
            <CreateRouter routers={routers}/>
          </ConfigProviderMobile>
        </ConfigProvider>
      </Provider>
    </React.Fragment>
  );
};

ReactDOM.render(<App/>, document.getElementById("root") as HTMLDivElement);
