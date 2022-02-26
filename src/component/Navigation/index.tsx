import * as React from "react";
import styles from "./styles.less";

const Navigation = (props: { data: any[] }): React.ReactElement => {

  return <div className={styles.navigation}>
    <div className={styles.menus}>
      <div className={styles.point}>

      </div>
    </div>
  </div>;
};

export default Navigation;
