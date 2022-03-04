import * as React from "react";
import styles from "./index.less";
import QRCode from "@/component/ImageQRCode";
import icon from "@/common/images/icon.png";

const ImageQRCode = () => {
  return (
    <div className={styles.imageBox}>
      <QRCode
        value={"https://www.baidu.com"}
        logo={icon}
      />
    </div>
  );
};

export default ImageQRCode;
