export const newWorkerForTimes = (time: number): Worker => {
  const webWorkerFile: string = `
     let time = ${time};
     const interval = setInterval(() => {
        postMessage(--time);
        time === 0 && clearInterval(interval);
     }, 1000);`;
  const file = new Blob([webWorkerFile]); //将代码转化成文件
  return new Worker(window.URL.createObjectURL(file)); //将文件放入到新的线程中
};
