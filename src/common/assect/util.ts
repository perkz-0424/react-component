import {success} from "@/common/assect/message";

export const getParamsToSearch = (params: any) => {
  let search = "";
  for (const p in params) {
    if (params.hasOwnProperty(p) && (params[p] || params[p] === 0 || params[p] === "")) {
      search += `${p}=${params[p]}&`;
    }
  }
  search = search.substr(0, search.length - 1);
  return search;
};

export const getSearchToParams = (search?: string) => {
  const params: any = {};
  if (search) {
    const a = (search.replace("?", "")).split("&");
    a.forEach((item) => {
      const keyValue = item.split("=");
      params[keyValue[0]] = decodeURI(keyValue[1]);
    });
  }
  return params;
};

export const arrayObjReduce = (arr: any[]) => {
  const obj: any = {};
  arr = arr.reduce(function (item, next) {
    if (!obj[next.key]) {
      obj[next.key] = item.push(next);
    }
    return item;
  }, []);
  return arr;
};

export function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function getBinary(file: any) {
  return new Promise((resolve, reject) => {
    getBase64(file)
      .then((res: any) => {
        const arr = res.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return resolve(new Blob([u8arr], {type: mime}));
      })
      .catch(reject);
  });
}

export const sleep = (time: number) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

export const copyText = (value: string) => {
  const oInput = document.createElement("input");
  oInput.value = value;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand("Copy");
  oInput.className = "oInput";
  oInput.style.display = "none";
  success("复制成功");
};
