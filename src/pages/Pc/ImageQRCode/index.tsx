import * as React from "react";
import styles from "./index.less";
import QRCode from "@/component/ImageQRCode";

const ImageQRCode = () => {
  return (
    <div className={styles.imageBox}>
      <QRCode
        value={"https://www.baidu.com"}
      />
    </div>
  );
};

export default ImageQRCode;
