import * as React from "react";
import styles from "./styles.less";

const H52PDF = (props: { children?: React.ReactElement | null, id: string }): React.ReactElement => {
  console.log(props.id)
  return <div className={styles.h52pdf} id={props.id}>
    {props.children}
  </div>;
};

export default H52PDF;
