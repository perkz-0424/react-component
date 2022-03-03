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

export function getImageBase64(src: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "*";
    image.src = src;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      (ctx as CanvasRenderingContext2D).drawImage(image, 0, 0, image.width, image.height);
      const dataURL = canvas.toDataURL("image/png");
      canvas.remove();
      image.remove();
      return resolve(dataURL);
    };
    image.onerror = (error) => reject(error);
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

export const randAChar = () => {
  const n = Math.random() * 10;
  const s = String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));
  if (n > 5) {
    return s;
  } else {
    return (s).toUpperCase();
  }
};

export const randCode = (n = Math.random() * 5) => {
  let s = "";
  for (let i = 0; i < n; i++) {
    s += randAChar();
  }
  return ((s +
      Math.ceil(
        Math.random() * 100) +
      new Date().getTime() +
      Math.ceil(Math.random() * 100)
    )
      .replace(/0/g, "h"))
      .replace("9", "f") +
    randAChar();
};
