import * as React from "react";
import {Input} from "element-react";
import styles from "./styles.less";

const Search = (props: {
  onFocus?: (e: React.SyntheticEvent<HTMLInputElement, Event> | undefined) => any,
  onBlur?: (e: React.SyntheticEvent<HTMLInputElement, Event> | undefined) => any,
  className?: string,

}): React.ReactElement => {
  const [focus, set_focus] = React.useState(false);
  return <div
    className={`${styles.search} ${focus ? styles.focus : styles.blur} ${props.className ? props.className : ""}`}
  >
    <Input
      placeholder="搜索组件"
      className={styles.input}
      // icon="circle-cross"
      onFocus={(e) => {
        set_focus(true);
        props.onFocus && props.onFocus(e);
      }}
      onBlur={(e) => {
        set_focus(false);
        props.onBlur && props.onBlur(e);
      }}
    />
    <div className={styles.listContainer}>
      <div className={styles.list}>
        <div className={styles.items}>

        </div>
      </div>
    </div>
  </div>;
};
export default Search;
