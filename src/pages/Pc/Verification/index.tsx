import * as React from "react";
import styles from "./styles.less";
import VerificationComponent from "@/component/Verification";
import TimeMeter from "@/component/TimeMeter";

const Verification = () => {
  return <div className={styles.verification}>
    <VerificationComponent amount={6} value={"125"}/>
    <br/>
    <VerificationComponent amount={4} value={"zyhf"}/>
    <br/>
    <TimeMeter/>
  </div>;
};

export default Verification;
