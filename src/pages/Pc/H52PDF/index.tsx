import * as React from "react";
import styles from "./styles.less";
import H52PDFComponent from "@/component/H52PDF";
import {randCode} from "@/common/assect/util";
import {Button} from "element-react";
import moment from "moment";

const id = randCode();
const name = `梦想小镇(${moment().format("YYYY-MM-DD")})`;
const H52PDF = (): React.ReactElement => {
  const divRef = React.useRef<HTMLDivElement | null>(null);
  const download = React.useCallback((type: string) =>
    new Promise((resolve) => H52PDFComponent.outputPdf(id, type, name, (info) => resolve(info))), []);
  const outputCanvas = () => {
    H52PDFComponent.outputCanvas(id).then((canvas) => {
      divRef && divRef.current && divRef.current.appendChild(canvas as HTMLCanvasElement);
    });
  };
  const outputImage = () => {
    H52PDFComponent.outputImage(id).then((info) => {
      console.log(info);
    });
  };
  const savePDF = () => {
    download("save").then((info) => {
      console.log(info);
    });
  };

  const downloadPDF = () => {
    download("download").then((info) => {
      console.log(info);
    });
  };

  return <div className={styles.h52PDF}>
    <H52PDFComponent id={id} className={styles.demo}>
      <div className={styles.box}>
        <span className={styles.colorRed}>美丽的</span>梦想小镇
      </div>
    </H52PDFComponent>
    <div className={styles.buttons}>
      <Button onClick={outputCanvas}>HTML转Canvas</Button>
      <Button onClick={outputImage}>HTML转图片</Button>
      <Button onClick={savePDF}>HTML转PDF</Button>
      <Button onClick={downloadPDF}>下载PDF</Button>
    </div>
    <div ref={divRef}/>
  </div>;
};

export default H52PDF;
