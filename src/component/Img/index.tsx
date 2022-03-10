import * as React from "react";
import styles from "./styles.less";
import {getImageBase64} from "@/common/assect/util";
import {compress} from "@/component/H52PDF";

interface IProps {
  src: string,
  alt?: string,
  className?: string,
  loading?: boolean
}

const Img = (props: IProps): React.ReactElement => {
  const [src, set_src] = React.useState("");

  React.useEffect(() => {
    getImageBase64(props.src).then((a) => {
      compress(a as string, 1.2, 350000).then((data: any) => {
        set_src(data.base64);
      });
    });
  }, [props.src]);
  return <div className={`${styles.box} ${props.className ? props.className : ""}`}>
    {src ? <img src={src} alt={props.alt} className={styles.img}/> : <></>}
  </div>;
};

export default Img;
