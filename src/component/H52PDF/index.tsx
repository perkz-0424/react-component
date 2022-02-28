import * as React from "react";
import styles from "./styles.less";
import {outputPdf, canvasToPdf, compress, outputCanvas, outputImage} from "@/component/H52PDF/action";

const H52PDF = (props: {
  children?: React.ReactElement | null,
  id: string,
  className?: string
}): React.ReactElement => {
  return <div className={`${styles.h52pdf} ${props.className ? props.className : ""}`} id={props.id}>
    {props.children}
  </div>;
};
H52PDF.outputPdf = outputPdf;
H52PDF.canvasToPdf = canvasToPdf;
H52PDF.compress = compress;
H52PDF.outputCanvas = outputCanvas;
H52PDF.outputImage = outputImage;

export {outputPdf, canvasToPdf, compress, outputCanvas, outputImage};
export default H52PDF;
