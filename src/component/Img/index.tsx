import * as React from "react";

interface IProps {
  src: string,
  alt?: string,
  className?: string,
}

const Img = (props: IProps): React.ReactElement => {
  const [src, set_src] = React.useState(props.src);
  React.useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", props.src, true);
    xhr.responseType = "blob";
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
  return <>
    <img src={src} alt={props.alt} className={`${props.className ? props.className : ""}`}/>
  </>;
};

export default Img;
