import {jsPDF} from "jspdf";

const html2canvas = require("html2canvas").default;

export const outputPdf = (id: string, type: string, name = "pdf文件", cb?: (info?: any) => any | undefined,) => {
  const targetPdf = document.getElementById(id) as HTMLElement;
  html2canvas(targetPdf, {imageTimeout: 3000000, useCORS: true}).then(
    (canvas: HTMLCanvasElement) => compress(
      canvas.toDataURL("image/jpeg", 1),
      1.1,
      (blob, w, h) => canvasToPdf(blob, w, h, type, cb, name)
    )
  );
};

export const outputCanvas = (id: string) => {
  const targetPdf = document.getElementById(id) as HTMLElement;
  html2canvas(targetPdf, {imageTimeout: 3000000, useCORS: true}).then(
    (canvas: HTMLCanvasElement) => {

    }
  );
};

export const outputImage = (id: string) => {
  const targetPdf = document.getElementById(id) as HTMLElement;
  html2canvas(targetPdf, {imageTimeout: 3000000, useCORS: true}).then(
    (canvas: HTMLCanvasElement) => {

    }
  );
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
