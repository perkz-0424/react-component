import * as  React from "react";
import styles from "./styles.less";
import {Input, Button} from "element-react";
import {newWorkerForTimes} from "./action";

interface IProps {
  send?: () => any
}

const TimeMeter = (props: IProps) => {
  let worker: Worker | null = null; // 计时器
  const [focus, set_focus] = React.useState<boolean>(false);
  const [start, set_start] = React.useState<boolean>(false);
  const [second, set_second] = React.useState<number>(60);
  const send = () => {
    set_start(true);
    props.send && props.send();
    worker && worker.terminate();
    worker = newWorkerForTimes(60);
    worker.onmessage = ({data}) => {
      if (data === 0) {
        worker && worker.terminate();
        set_second(60);
        set_start(false);
      } else {
        set_second(data as number);
      }
    };
  };
  React.useEffect(() => {
    return () => {
      worker && worker.terminate();
    };
  }, []);
  return <div className={`${styles.time_meter} ${focus ? styles.focus : ""}`}>
    <Input
      className={styles.input}
      maxLength={11}
      onFocus={() => set_focus(true)}
      onBlur={() => set_focus(false)}
    />
    <div className={styles.end}>
      {start ? <span>{second}s后重新发送</span> : <Button className={styles.button} onClick={send}>发送</Button>}
    </div>
  </div>;
};

export default TimeMeter;
