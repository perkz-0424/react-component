import * as React from "react";
import styles from "./styles.less";
import {IReactComponent} from "@/definitions/type";
import {connect} from "react-redux";
import {changeEnvironment} from "@/common/assect/styles";
import "element-theme-default";
import zhCN from "antd/lib/locale/zh_CN";
import {ConfigProvider} from "antd";
import Search from "@/component/Search";


const {mapState, mapDispatch} = require("@/store/pc/action").default;

interface IProps extends ReturnType<typeof mapDispatch>, ReturnType<typeof mapState> {
}


const Pc: IReactComponent<IProps> = (props) => {
  const getSearchData = React.useCallback(() => {
    return props["routerHistory"]["routers"][0]["children"][0]["children"]
      .map((e: any) => ({
        name: e.name,
        path: e.path.toLowerCase()
      }));
  }, []);
  React.useEffect(() => changeEnvironment("pc"), []);
  return <React.Fragment>
    <ConfigProvider locale={zhCN}>
      <div className={styles.pc}>
        <div className={styles.search}>
          <Search data={getSearchData()}/>
        </div>
        <div className={styles.body}>
          <div className={styles.tab}>
            <div className={styles.menus}>

            </div>
          </div>
          <div className={styles.component}>
            {props.childrenRouter()}
          </div>
        </div>
      </div>
    </ConfigProvider>
  </React.Fragment>;
};

export default connect(mapState, mapDispatch)(Pc);
