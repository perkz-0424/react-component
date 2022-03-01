import * as React from "react";
import styles from "./styles.less";
import H52PDFComponent from "@/component/H52PDF";
import {randCode} from "@/common/assect/util";
import {Button} from "element-react";
import moment from "moment";
import Img from "@/component/Img";

const id = randCode();
const name = `梦想小镇(${moment().format("YYYY-MM-DD")})`;
const H52PDF = (): React.ReactElement => {
  const [loading, set_loading] = React.useState(false)
  const divRef = React.useRef<HTMLDivElement | null>(null);
  const download = React.useCallback((type: string) =>
    new Promise((resolve) => H52PDFComponent.outputPdf(id, type, name, (info) => resolve(info))), []);
  const outputCanvas = () => {
    set_loading(true);
    H52PDFComponent.outputCanvas(id).then((canvas) => {
      console.log(canvas);
      set_loading(false);
    });
  };
  const outputImage = () => {
    set_loading(true);
    H52PDFComponent.outputImage(id).then((data) => {
      const img = new Image(500, 300);
      img.src = data;
      img.onload = () => {
        divRef && divRef.current && divRef.current.appendChild(img);
        set_loading(false);
      };
    });
  };
  const savePDF = () => {
    set_loading(true);
    download("save").then((info) => {
      console.log(info);
      set_loading(false);
    });
  };

  const downloadPDF = () => {
    set_loading(true);
    download("download").then((info) => {
      console.log(info);
      set_loading(false);
    });
  };

  return <div className={styles.h52PDF}>
    <H52PDFComponent id={id} className={styles.demo}>
      <div className={styles.box}>
        <Img
          src="https://quanmai-cloud.oss-cn-hangzhou.aliyuncs.com/public/20220301/16461137061646113706984/IMG_0614.JPG"
          className={styles.img}
        />
        <div className={styles.font}>
          <span className={styles.colorRed}>ABC</span>DEF
        </div>
      </div>
    </H52PDFComponent>
    <div className={styles.buttons}>
      <Button onClick={outputCanvas} loading={loading}>HTML转Canvas</Button>
      <Button onClick={outputImage} loading={loading}>HTML转图片</Button>
      <Button onClick={savePDF} loading={loading}>HTML转PDF</Button>
      <Button onClick={downloadPDF} loading={loading}>下载PDF</Button>
    </div>
    <div ref={divRef}/>
  </div>;
};

export default H52PDF;
