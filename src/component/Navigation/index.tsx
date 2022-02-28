import * as React from "react";
import styles from "./styles.less";
import {Provider, connect} from "react-redux";
import store from "@/component/Navigation/store";
import {Icon} from "element-react";

const {mapState, mapDispatch} = require("@/component/Navigation/store/action").default;

interface IProps extends ReturnType<typeof mapDispatch>, ReturnType<typeof mapState> {
  goTo: (path: string) => any
  className?: string,
  data?: any[],
  path?: string,
  readonly open?: boolean,
}

const Navigation = connect(mapState, mapDispatch)((props: IProps): React.ReactElement => {
  return <div
    className={`${styles.navigation} ${props.open ? styles.open : styles.close} ${props.className ? props.className : ""}`}>
    <div className={`${styles.menus}`}>
      <div className={styles.groups}>
        <ul className={styles.group}>
          {props.sortMenus().map((i: { name: string, children: { enName: string, name: string }[] }, index: number) =>
            <li key={index} className={styles.level1}>
              <span>{i.name}</span>
              <ul className={styles.group2}>
                {i.children.map((v, k: number) => <li
                  key={k}
                  className={styles.level2}
                  onClick={() => props.goTo(v.enName)}>
                  <span className={props.path === v.enName ? styles.active : ""}>{v.name}({v.enName})</span>
                </li>)}
              </ul>
            </li>)}
        </ul>
      </div>
    </div>
    <div className={`${styles.pointContainer}`}>
      <div className={styles.point} onClick={() => props.setOpen(!props.open)}>
        {props.open ? <Icon name="arrow-left"/> : <Icon name="arrow-right"/>}
      </div>
    </div>
  </div>;
});

export default (props: IProps) => <Provider store={store}>< Navigation {...props}/></Provider>
