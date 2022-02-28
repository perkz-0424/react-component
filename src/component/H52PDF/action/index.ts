import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";

const getElement = (target: HTMLElement | string) => {
  if (typeof target === "string") {
    return document.getElementById(target) as HTMLElement;
  } else {
    return target;
  }
};
export const outputPdf = async (target: HTMLElement | string, type: string, name = "pdf文件", cb?: (info?: any) => any | undefined,) => {
  const targetPdf = getElement(target);
  const image = await outputImage(targetPdf);
  compress(image, 1.1, (blob, w, h) => canvasToPdf(blob, w, h, type, cb, name));
  return image;
};

export const outputCanvas = (target: HTMLElement | string) => {
  return new Promise((resolve) => {
    const targetPdf = getElement(target);
    html2canvas(targetPdf, {imageTimeout: 3000000, useCORS: true})
      .then((canvas: HTMLCanvasElement) => resolve(canvas));
  });
};

export const outputImage = async (target: HTMLElement | string) => {
  const targetPdf = getElement(target);
  const canvas = await outputCanvas(targetPdf) as HTMLCanvasElement;
  return canvas.toDataURL("image/jpeg", 1);
};
//压缩图片
export const compress = (base64: string, rate = 1.2, callback: (base64: string, w: number, h: number) => any) => {
  const img = new Image();
  img.src = base64;
  img.onload = function () {
    const canvas = document.createElement("canvas");
    const w = img.width / rate;
    const h = img.height / rate;
    canvas.setAttribute("width", w as any);
    canvas.setAttribute("height", h as any);
    // @ts-ignore
    canvas.getContext("2d").drawImage(img, 0, 0, w, h);
    const base64 = canvas.toDataURL("image/jpeg");
    canvas.toBlob(function (blob: any) {
      blob.size > 10005000 ? compress(base64, rate, callback) : callback(base64, w, h);
      canvas.remove();
      img.remove();
    }, "image/jpeg");
  };
};
//输出pdf
export const canvasToPdf = (base64: string, w: number, h: number, type: string, cb?: (params: any) => any, name = "pdf文件") => {
  const r = h / w;
  const PDF = new jsPDF("p", "pt", "a4");
  if (r <= 841.89 / 595.28) {
    PDF.addImage(base64, "JPEG", 0, 0, 595.28, 595.28 * r);
  } else {
    const pdfPageH = 595.28 * r;
    const pages = Math.ceil(pdfPageH / 841.89);//一共多少页
    let i = 0;
    while (i < pages) {
      PDF.addImage(base64, "JPEG", 0, -i * 841.89, 595.28, 595.28 * r);
      i !== pages - 1 && PDF.addPage();
      i++;
    }
  }
  switch (type) {
    case "download"://下载pdf文档
      PDF.save(`${name}.pdf`);
      cb && cb(PDF.output("blob"));
      break;
    case "save"://保存pdf文档
      const report = PDF.output("blob");
      const reader = new FileReader();
      reader.readAsDataURL(report);
      reader.onload = () => {
        cb && cb({name: `${name}.pdf`, size: report.size, file: reader.result});
      };
      break;
    default:
      PDF.save(`${name}.pdf`);
      cb && cb(PDF.output("blob"));
      break;
  }
};
