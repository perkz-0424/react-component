import * as React from "react";
import styles from "./styles.less";
import {IReactComponent} from "@/definitions/type";
import {connect} from "react-redux";
import {changeEnvironment} from "@/common/assect/styles";
import "element-theme-default";
import zhCN from "antd/lib/locale/zh_CN";
import {ConfigProvider} from "antd";


const {mapState, mapDispatch} = require("@/store/pc/action").default;

interface IProps extends ReturnType<typeof mapDispatch>, ReturnType<typeof mapState> {
}

const Pc: IReactComponent<IProps> = (props) => {
  React.useEffect(() => changeEnvironment("pc"), []);
  return <React.Fragment>
    <ConfigProvider locale={zhCN}>
      <div className={styles.pc}>
        {props.childrenRouter()}
      </div>
    </ConfigProvider>
  </React.Fragment>;
};

export default connect(mapState, mapDispatch)(Pc);
