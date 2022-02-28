import * as React from "react";
import styles from "./styles.less";
import H52PDFComponent from "@/component/H52PDF";
import {randCode} from "@/common/assect/util";
import {Button} from "element-react";
import moment from "moment";
import Content from "@/component/Content";

const H52PDF = (): React.ReactElement => {
  const id = randCode();
  const name = `梦想小镇(${moment().format("YYYY-MM-DD")})`;
  const download = React.useCallback((type: string) =>
    new Promise((resolve) => H52PDFComponent.outputPdf(id, type, name, (info) => resolve(info))), []);
  return <div className={styles.h52PDF}>
    <Content title="H5转PDF" message="h5转canvas、h5转图片、h5转pdf"/>
    <H52PDFComponent id={id} className={styles.demo}>
      <div className={styles.box}>
        <span className={styles.colorRed}>美丽的</span>梦想小镇
      </div>
    </H52PDFComponent>
    <div className={styles.buttons}>
      <Button onClick={() => H52PDFComponent.outputCanvas(id).then((info) => console.log(info))}>HTML转Canvas</Button>
      <Button onClick={() => H52PDFComponent.outputImage(id).then((info) => console.log(info))}>HTML转图片</Button>
      <Button onClick={() => download("save").then((info) => console.log(info))}>HTML转PDF</Button>
      <Button onClick={() => download("download").then((info) => console.log(info))}>下载PDF</Button>
    </div>
  </div>;
};

export default H52PDF;
