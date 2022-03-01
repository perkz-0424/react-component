import * as React from "react";
import styles from "./styles.less";
import ImgComponent from "@/component/Img";

const Img = (): React.ReactElement => {
  return <ImgComponent src="https://quanmai-cloud.oss-cn-hangzhou.aliyuncs.com/public/20220301/16461137061646113706984/IMG_0614.JPG" className={styles.img}/>;
};

export default Img;
