import React, {useEffect, useState, memo} from "react";
import styles from "./index.less";
import {randCode} from "@/common/assect/util";
import H52PDF from "@/component/H52PDF";

const QRCode = require("qrcode.react");
const id = randCode();
const ImageQRCode = (props: {
  value?: string;
  logo?: string;
  isImage?: boolean;
}) => {
  const {value, logo, isImage} = props;
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    setImgSrc("");
    H52PDF.outputImage(id).then(setImgSrc);
  }, [value, logo, isImage]);
  return (
    <React.Fragment>
      {isImage ? <div className={styles.imageBox}>
        <img src={value} alt=" " className={styles.img}/>
      </div> : <div className={styles.line}>
        {imgSrc ? <img alt=" " src={imgSrc} className={styles.imageBox}/> :
          <H52PDF
            className={styles.imageBox}
            id={id}
            children={
              <React.Fragment>
                <QRCode
                  className={styles.qr} value={value} fgColor="#000000" bgColor="rgba(0,0,0,0)"
                  imageSettings={{src: "000000", height: logo ? 17 : 0, width: logo ? 17 : 0, excavate: true}}
                />
                {logo ? <div className={styles.icon}><img src={logo} alt="" className={styles.icons}/></div> :
                  <React.Fragment/>}
              </React.Fragment>
            }/>}
      </div>}
    </React.Fragment>
  );
};

export default memo(ImageQRCode);
