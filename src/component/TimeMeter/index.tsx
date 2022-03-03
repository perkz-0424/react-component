import * as  React from "react";
import styles from "./styles.less";
import {Input, Button} from "element-react";


const TimeMeter = () => {
  const [focus, set_focus] = React.useState<boolean>(false);
  return <div className={`${styles.time_meter} ${focus ? styles.focus : ""}`}>
    <Input
      className={styles.input}
      maxLength={11}
      onFocus={() => set_focus(true)}
      onBlur={() => set_focus(false)}
    />
    <div className={styles.end}>
      <Button className={styles.button}>发送</Button>
    </div>
  </div>;
};

export default TimeMeter;
