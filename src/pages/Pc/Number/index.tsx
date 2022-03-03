import * as React from "react";
import ActiveNumber from "@/component/ActiveNumber";
import styles from "./styles.less"

const Number = () => {
  return <div className={styles.number}>
    <ActiveNumber number={100}/><br/>
    <ActiveNumber number={390}/><br/>
    <ActiveNumber number={0}/><br/>
    <ActiveNumber number={190066}/><br/>
  </div>;
};

export default Number;
