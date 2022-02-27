import * as React from "react";
import {Input} from "element-react";
import styles from "./styles.less";
import {Provider, connect} from "react-redux";
import store from "@/component/Search/store";
import {LoadingOutlined, SearchOutlined} from "@ant-design/icons";
import {useCallback} from "react";


const {mapState, mapDispatch} = require("@/component/Search/store/action").default;

interface IProps extends ReturnType<typeof mapDispatch>, ReturnType<typeof mapState> {
  goTo: (path: string) => any
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
  React.useEffect(() => () => event("-"), []);

  const blur = React.useCallback((e: any) => {
    if (props.getBlurBool(e)) {
      props.setFocus(false);
      event("-");
    }
  }, []);

  const event = React.useCallback((type: string) => {
    switch (type) {
      case "+":
        return document.addEventListener("click", blur, false);
      case "-":
        return document.removeEventListener("click", blur, false);
    }
  }, []);

  const content = useCallback((message: string) => {
    if (props.search) {
      const msg = message.split(props.search as string);
      if (msg.length === 2) {
        return <>{msg[0]}<span className={styles.sStyle}>{props.search}</span>{msg[1]}</>;
      }
      return message;
    } else {
      return message;
    }
  }, [props.search]);
  return <div
    id={props.search_id}
    className={`${styles.search} ${props.focus ? styles.focus : styles.blur} ${props.className ? props.className : ""}`}
  >
    <Input
      value={props.search as string}
      placeholder="搜索组件"
      className={`${styles.input} ${props.search ? styles.isDel : styles.noDel}`}
      icon="circle-cross"
      onFocus={(e) => {
        props.setFocus(true);
        props.setItems(props.data, props.search).then(null);
        event("+");
        props.onFocus && props.onFocus(e);
      }}
      onBlur={(e) => {
        props.onBlur && props.onBlur(e);
      }}
      onChange={props.setSearch}
      onIconClick={() => props.setSearch("")}
    />
    <div className={styles.listContainer}>
      <div className={styles.list}>
        {props.items && props.items.length ? <div className={styles.items}>
          {props.items.map((i: { name: string, enName: string }, key) => {
            return <div
              key={key} className={styles.item}
              onClick={() => props.setSearch(i.name, [i])
                .then(() => props.setFocus(false))
                .then(() => event("-"))
                .then(() => props.goTo(i.enName))}>
              <span className={styles.name}>{content(`${i.name} ${i.enName}`)}</span>
              <span><SearchOutlined className={styles.icon}/></span>
            </div>;
          })}
        </div> : <div className={`${styles.loading} ${styles.other}`}>
          {props.loading ? "" : "未找到相关内容"}
          <div className={styles.otherSearch}/>
        </div>}
        {props.loading ? <div className={styles.loading}><LoadingOutlined className={styles.loadingIcon}/></div> : null}
      </div>
    </div>
  </div>;
});

export default (props: IProps) => <Provider store={store}><Search {...props}/></Provider>
