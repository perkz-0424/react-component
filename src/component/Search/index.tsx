import * as React from "react";
import {Input} from "element-react";
import styles from "./styles.less";
import {Provider, connect} from "react-redux";
import store from "@/component/Search/store";
import {LoadingOutlined, SearchOutlined} from "@ant-design/icons";


const {mapState, mapDispatch} = require("@/component/Search/store/action").default;

interface IProps extends ReturnType<typeof mapDispatch>, ReturnType<typeof mapState> {
  className?: string,
  onFocus?: (e: React.SyntheticEvent<HTMLInputElement, Event> | undefined) => any,
  onBlur?: (e: React.SyntheticEvent<HTMLInputElement, Event> | undefined) => any,
  onChange?: (e: React.SyntheticEvent<HTMLInputElement, Event> | undefined) => any,
  data?: any[],
  readonly search?: string,
  readonly focus?: boolean,
  readonly items?: any[],
}

const Search = connect(mapState, mapDispatch)((props: IProps): React.ReactElement => {
  return <div
    className={`${styles.search} ${props.focus ? styles.focus : styles.blur} ${props.className ? props.className : ""}`}
  >
    <Input
      value={props.search as string}
      placeholder="搜索组件"
      className={styles.input}
      icon="circle-cross"
      onFocus={async (e) => {
        await props.setFocus(true);
        await props.setItems(props.data, props.search);
        props.onFocus && props.onFocus(e);
      }}
      onBlur={async (e) => {
        await props.setFocus(false);
        props.onBlur && props.onBlur(e);
      }}
      onChange={props.setSearch}
    />
    <div className={styles.listContainer}>
      <div className={styles.list}>
        {
          props.items && props.items.length ? <div className={styles.items}>
            {props.items && props.items.map((i: { name: string, enName: string }, key) => {
              return <div key={key} className={styles.item} onClick={() => props.setSearch(i.name)}>
                <span className={styles.name}>{i.enName}：{i.name}</span>
                <span><SearchOutlined className={styles.icon}/></span>
              </div>;
            })}
          </div> : <div className={`${styles.loading} ${styles.other}`}>
            未找到相关内容
            <div className={styles.otherSearch}/>
          </div>
        }
        {props.loading ? <div className={styles.loading}><LoadingOutlined className={styles.loadingIcon}/></div> : null}
      </div>
    </div>
  </div>;
});

export default (props: IProps) => <Provider store={store}><Search {...props}/></Provider>
