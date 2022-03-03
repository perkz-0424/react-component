import * as React from "react";
import styles from "./styles.less";
import {getBase64} from "@/common/assect/util";

interface IProps {
  src: string,
  alt?: string,
  className?: string,
  loading?: boolean
}

const Img = (props: IProps): React.ReactElement => {
  const [src, set_src] = React.useState(props.src);
  const [percent, set_percent] = React.useState(0);

  React.useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", props.src, true);
    xhr.responseType = "blob";
    xhr.addEventListener("progress", (e) => {
      set_percent(parseInt((e.loaded * 100 / e.total).toFixed(2)));
    }, false);
    xhr.onloadend = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        blob && getBase64(blob).then((data) => set_src(data as string));
      }
    };
    xhr.send();
    return () => xhr.abort();
  }, [props.src]);
  return <div className={`${styles.box} ${props.className ? props.className : ""}`}>
    <img src={src} alt={props.alt} className={styles.img}/>
    {props.loading && percent !== 100 ? <div className={styles.percent}>
      <div className={styles.percentage} style={{width: `${percent}%`}}/>
    </div> : null}
  </div>;
};

export default Img;
