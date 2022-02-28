import * as React from "react";
import styles from "./styles.less";
import Cropper from "@/component/Cropper";
import mxxz from "@/common/images/mxxz.jpg";

const ImageCropper = (): React.ReactElement => {
  const [src, set_src] = React.useState(mxxz);
  return <div className={styles.imageCropper}>
    <Cropper
      H={300}
      W={618}
      aspectRatio={1.3}
      src={mxxz}
      onUpLoad={set_src}
    />
    <img alt=" " src={src} className={styles.image}/>
  </div>;
};

export default ImageCropper;
