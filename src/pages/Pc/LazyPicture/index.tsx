import * as React from "react";
import styles from "./styles.less";
import Content from "@/component/Content";
import LazyPictureComponent from "@/component/LazyPicture";
import mxxz from "@/common/images/mxxz.jpg";


const LazyPicture = (): React.ReactElement => {
  const preventDefault = (e: any) => {
    e.preventDefault();
  };

  return <div className={styles.lazyPicture}>
    <Content title="懒图片" message="懒图片"/>
    <LazyPictureComponent
      onMouseOver={() => {
        document.addEventListener("wheel", preventDefault, {passive: false});//阻止滚动
      }}
      onMouseOut={() => {
        document.removeEventListener("wheel", preventDefault, false);
      }}
      H={375 * 1.5}//容器高
      W={500 * 1.5}//容器宽
      src={mxxz}//图片图片的宽高会自适应容器
      maxMul={8} //最大倍数 1-10的正整数
      disableDoubleClick={true}//是否禁用双击事件
      haveScale={true}//是否显示刻度
    />
  </div>;
};

export default LazyPicture;
