import * as React from "react";
import styles from "./styles.less";
import VerificationComponent from "@/component/Verification";

const Verification = () => {
  return <div className={styles.verification}>
    <VerificationComponent amount={6} value={"125"}/>

    <VerificationComponent amount={4} value={"zyhf"}/>
  </div>;
};

export default Verification;
