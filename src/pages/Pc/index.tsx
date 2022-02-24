import * as React from "react";
import styles from "./styles.less";
import {IReactComponent} from "@/definitions/type";
import {connect} from "react-redux";
import {changeHtmlFontSize} from "@/common/assect/styles";
import {Input} from "element-react";


const {mapState, mapDispatch} = require("@/store/pc/action").default;

interface IProps extends ReturnType<typeof mapDispatch>, ReturnType<typeof mapState> {
}

const Pc: IReactComponent<IProps> = (props) => {
  React.useEffect(() => changeHtmlFontSize("pc"), []);
  return (
    <div className={styles.pc}>
      <Input placeholder="文本框"/>
    </div>
  );
};

export default connect(mapState, mapDispatch)(Pc);
