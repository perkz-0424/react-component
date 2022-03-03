import React, {useEffect, useState, memo} from "react";
import styles from "./index.less";
import {randCode} from "@/common/assect/util";

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
    if (!isImage) {
      const canvas = document.getElementById(id) as HTMLCanvasElement;
      if (value && canvas) {
        const data = canvas.toDataURL("image/png");
        setImgSrc(data);
      }
    }
  }, [value]);
  return (
    <>
      {isImage ? (
        <div className={styles.imageBox}>
          <img src={value} alt=" " className={styles.img}/>
        </div>
      ) : (
        <>
          {!imgSrc ? (
            <QRCode
              id={id}
              className={styles.qr}
              value={value}
              fgColor="#000000"
              bgColor="rgba(0,0,0,0)"
              imageSettings={{
                src: "imageUrl",
                height: logo ? 17 : 0,
                width: logo ? 17 : 0,
                excavate: true,
              }}
            />
          ) : (
            <div className={styles.imageBox}>
              <img src={imgSrc} alt="" className={styles.img}/>
              {logo ? (
                <div className={styles.icon}>
                  <img src={logo} alt="" className={styles.icons}/>
                </div>
              ) : null}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default memo(ImageQRCode);
