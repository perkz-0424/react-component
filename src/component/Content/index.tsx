import * as React from "react";
import styles from "./styles.less";

const Content = (props: { title: string, message: string }): React.ReactElement => {

  return <div className={styles.content}>
    {/*<h2>{props.title}</h2>*/}
    {/*<p className={styles.message}>*/}
    {/*  {props.message}*/}
    {/*</p>*/}
  </div>;
};

export default Content;
