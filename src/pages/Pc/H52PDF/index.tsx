import * as React from "react";
import styles from "./styles.less";
import H52PDFComponent from "@/component/H52PDF";
import {randCode} from "@/common/assect/util";
import {Button} from "element-react";
import moment from "moment";

const H52PDF = (): React.ReactElement => {
  const id = randCode();
  const name = `梦想小镇(${moment().format("YYYY-MM-DD")})`;
  const download = (type: string) => new Promise((resolve) => H52PDFComponent.outputPdf(id, type, name, (info) => resolve(info)));
  return <div className={styles.h52PDF}>
    <H52PDFComponent id={id} className={styles.demo}>
      <div className={styles.box}>
        梦想小镇
      </div>
    </H52PDFComponent>
    <div className={styles.buttons}>
      <Button onClick={() => download("download")}>下载PDF</Button>
      <Button onClick={() => download("save")}>保存PDF</Button>
    </div>
  </div>;
};

export default H52PDF;
