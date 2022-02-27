import * as React from "react";
import styles from "./styles.less";
import {Provider, connect} from "react-redux";
import store from "@/component/Navigation/store";
import {Icon} from "element-react";

const {mapState, mapDispatch} = require("@/component/Navigation/store/action").default;

interface IProps extends ReturnType<typeof mapDispatch>, ReturnType<typeof mapState> {
  goTo?: (path: string) => any
  className?: string,
  data?: any[],
  readonly open?: boolean,
}

const Navigation = connect(mapState, mapDispatch)((props: IProps): React.ReactElement => {
  const menus = props.sortMenus();
  return <div
    className={`${styles.navigation} ${props.open ? styles.open : styles.close} ${props.className ? props.className : ""}`}>
    <div className={`${styles.menus}`}>
      <div className={styles.point} onClick={() => props.setOpen(!props.open)}>
        {props.open ? <Icon name="arrow-left"/> : <Icon name="arrow-right"/>}
      </div>
    </div>
  </div>;
});

export default (props: IProps) => <Provider store={store}>< Navigation {...props}/></Provider>
