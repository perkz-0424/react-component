import * as React from "react";
import styles from "./styles.less";
import H52PDFComponent from "@/component/H52PDF";
import {randCode} from "@/common/assect/util";

const H52PDF = (): React.ReactElement => {
  const id = randCode();
  return <div className={styles.h52PDF}>
    <H52PDFComponent id={id}>
      <div>
        风景
      </div>
    </H52PDFComponent>
  </div>;
};

export default H52PDF;
