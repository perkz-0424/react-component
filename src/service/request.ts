import {getParamsToSearch} from "@/common/assect/util";
import {fail} from "@/common/assect/message";

export default function ajax<T>(
  url: string,
  data: any,
  method: string,
  headers: any
) {
  return new Promise<T>((resolve: any) => {
    const netError = {code: 0, data: {msg: "网络错误"}};
    const search = getParamsToSearch(data);
    const options: any = {method, headers, credentials: "include"};
    switch (method.toUpperCase()) {
      case "GET":
      case "DELETE": {
        url = search ? `${url}?${search}` : url;
        break;
      }
      case "POST":
      case "PUT": {
        options.body = JSON.stringify(data);
        break;
      }
      default:
        return resolve(netError);
    }
    fetch(url, options).then((res) => {
      try {
        if (!res.ok) {
          res.json().then((res: any) => {
            return resolve({...netError, code: res.code});
          });
          return;
        }
        res.json().then((resultData) => {
          if (resultData.code === 0) {
            return resolve(resultData);
          } else {
            return resolve(resultData);
          }
        });
      } catch (e) {
        return resolve(netError);
      }
    }).catch(() => {
      return resolve(netError);
    });
  }).then((res: any) => {
    if (res.code === 0) {
      fail(res.message || res.msg || "未定义的错误!");
    } else if (res.code === 401) {
      fail("请重新登录!");
      window.location.href = `/login?f=${encodeURIComponent(window.location.href)}`;
    }
    return res;
  });
}
