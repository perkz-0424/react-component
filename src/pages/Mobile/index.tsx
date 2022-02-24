import * as React from "react";
import styles from "./styles.less";
import {IReactComponent} from "@/definitions/type";
import {connect} from "react-redux";
import {changeHtmlFontSize} from "@/common/assect/styles";
import {Input} from "antd-mobile";

const {mapState, mapDispatch} = require("@/store/mobile/action").default;

interface IProps extends ReturnType<typeof mapDispatch>, ReturnType<typeof mapState> {
}

const Mobile: IReactComponent<IProps> = () => {
  React.useEffect(() => changeHtmlFontSize("mobile"), []);
  return (
    <div className={styles.mobile}>
      <Input placeholder="文本框"/>
    </div>
  );
};

export default connect(mapState, mapDispatch)(Mobile);
