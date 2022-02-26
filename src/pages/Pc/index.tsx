import * as React from "react";
import styles from "./styles.less";
import {IReactComponent} from "@/definitions/type";
import {connect} from "react-redux";
import {changeEnvironment} from "@/common/assect/styles";
import "element-theme-default";
import zhCN from "antd/lib/locale/zh_CN";
import {ConfigProvider} from "antd";
import Search from "@/component/Search";
import Navigation from "@/component/Navigation";


const {mapState, mapDispatch} = require("@/store/pc/action").default;

interface IProps extends ReturnType<typeof mapDispatch>, ReturnType<typeof mapState> {
}


const Pc: IReactComponent<IProps> = (props) => {
  React.useEffect(() => changeEnvironment("pc"), []);
  const data = props.getSearchData();
  return <React.Fragment>
    <ConfigProvider locale={zhCN}>
      <div className={styles.pc}>
        <div className={styles.search}>
          <Search
            data={data}
            goTo={(path) => props.routerHistory.navigate(path)}
          />
        </div>
        <div className={styles.body}>
          <Navigation data={data}/>
          <div className={styles.component}>
            {props.childrenRouter()}
          </div>
        </div>
      </div>
    </ConfigProvider>
  </React.Fragment>;
};

export default connect(mapState, mapDispatch)(Pc);
