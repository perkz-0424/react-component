import * as React from "react";
import styles from "./styles.less";
import Cropper from "@/component/Cropper";
import mxxz from "@/common/images/mxxz.jpg";

const ImageCropper = (): React.ReactElement => {
  const [src, set_src] = React.useState("");
  return <div className={styles.imageCropper}>
    <div className={styles.image}>
      {src ? <img alt=" " src={src}/> : null}
    </div>
    <Cropper
      H={300}
      W={618}
      aspectRatio={1.3}
      src={mxxz}
      onChange={() => {
      }}
      onOk={set_src}
    />
  </div>;
};

export default ImageCropper;
