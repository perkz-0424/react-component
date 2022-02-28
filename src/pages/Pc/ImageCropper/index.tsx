import * as React from "react";
import styles from "./styles.less";
import Cropper from "@/component/Cropper";
import mxxz from "@/common/images/mxxz.jpg";
import Content from "@/component/Content";

const ImageCropper = (): React.ReactElement => {
  const [src, set_src] = React.useState("");
  return <div className={styles.imageCropper}>
    <Content title="裁剪框" message="裁剪框"/>
    <Cropper
      H={300}
      W={618}
      aspectRatio={1.3}
      src={mxxz}
      onChange={() => {
      }}
      onOk={set_src}
    />
    {src ? <img alt=" " src={src} className={styles.image}/> : null}
  </div>;
};

export default ImageCropper;
