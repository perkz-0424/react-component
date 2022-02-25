import {message} from "antd";
import "antd/es/message/style/css";

const status = {
  loading: false,
};
export const success = (m: string) => {
  if (!status.loading) {
    status.loading = true;
    message.success(m, 1).then(null);
    const t = setTimeout(() => {
      status.loading = false;
      clearTimeout(t);
    }, 500);
  }
};

export const fail = (m: string) => {
  if (!status.loading) {
    status.loading = true;
    message.error(m, 1).then(null);
    const t = setTimeout(() => {
      status.loading = false;
      clearTimeout(t);
    }, 500);
  }
};
