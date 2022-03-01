import React from "react";

const workTime = (time = 0) => {
  const webWorkerFile = `
     let time = ${time};
     let num = 0;
     const interval = setInterval(() => {
        num = num + Math.ceil (time / 30);
        if(num < time){
          postMessage(num);
        } else {
          postMessage(time);
          clearInterval(interval)
        }
     }, 10);`;
  const file = new Blob([webWorkerFile]); //将代码转化成文件
  return new Worker(window.URL.createObjectURL(file)); //将文件放入到新的线程中
};

const ActiveNumber = (props: { number: number }) => {
  const [num, setNum] = React.useState(0);
  let work: Worker | null = null;
  React.useEffect (() => {
    setNum (0);
    work && work.terminate ();
    work = workTime (props.number) as Worker;
    work.onmessage = ({ data }) => {
      setNum (data);
      props.number === data && work && work.terminate ();
    };
    return () => {
      work && work.terminate ();
    };
  }, [props.number]);
  return <>{num}</>;
};

export default ActiveNumber;
