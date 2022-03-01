import * as React from "react";
import styles from "./styles.less";

interface IProps {
  src: string,
  alt?: string,
  className?: string,
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
    xhr.onload = (a) => {
      if (xhr.status == 200) {
        const blob = xhr.response;
        const oFileReader = new FileReader();
        oFileReader.readAsDataURL(blob);
        oFileReader.onloadend = (e: any) => {
          set_src(e.target.result);
        };
      }
    };
    xhr.send();
  }, []);
  return <div className={`${styles.box} ${props.className ? props.className : ""}`}>
    <img src={src} alt={props.alt} className={styles.img}/>
    {percent !== 100 ? <div className={styles.percent}>
      <div className={styles.percentage} style={{width: `${percent}%`}}/>
    </div> : null}
  </div>;
};

export default Img;
