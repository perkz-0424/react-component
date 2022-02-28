import * as React from "react";
import styles from "./styles.less";
import Content from "@/component/Content";

const LazyPicture = (): React.ReactElement => {

  return <div className={styles.lazyPicture}>
    <Content title="懒图片" message="懒图片"/>
  </div>;
};

export default LazyPicture;
