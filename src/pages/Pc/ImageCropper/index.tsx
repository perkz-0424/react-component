import * as React from "react";
import styles from "./styles.less";
import Cropper from "@/component/Cropper";
import mxxz from "@/common/images/mxxz.jpg";
import {Dialog} from "element-react";

const ImageCropper = (): React.ReactElement => {
  const [image] = React.useState(mxxz);
  const [src, set_src] = React.useState("");
  const [visible, set_visible] = React.useState(false);
  return <div className={styles.imageCropper}>
    <div className={styles.image} onClick={() => set_visible(true)}>
      {src ? <img alt=" " src={src}/> : "+"}
    </div>
    <Dialog
      visible={visible}
      className={styles.dia}
      onCancel={() => set_visible(false)}
    >
      <div className={styles.diaBox}>
        <Cropper
          H={300}
          W={400}
          aspectRatio={1.3}
          src={image}
          onChange={() => {
          }}
          onOk={(data) => {
            set_visible(false);
            set_src(data);
          }}
        />
      </div>
    </Dialog>
  </div>;
};

export default ImageCropper;
