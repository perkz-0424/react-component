import config from "@/config";

const routes = [
  {
    path: "/",
    Component: require("@/pages").default,
    redirect: config.environment,
    name: "首页",
    children: [
      {
        path: "/pc",
        Component: require("@/pages/Pc").default,
        name: "pc端",
        children: [
          {
            path: "/image",
            Component: require("@/pages/Pc/Image").default,
            name: "图片上传",
            keywords: ["图片"]
          },
          {
            path: "/cropper",
            Component: require("@/pages/Pc/ImageCropper").default,
            name: "图片裁剪",
            keywords: ["图片"]
          },
          {
            path: "/h52PDF",
            Component: require("@/pages/Pc/H52PDF").default,
            name: "H5转PDF",
            keywords: ["PHF", "图片", "H5"]
          },
          {
            path: "/lazyPicture",
            Component: require("@/pages/Pc/LazyPicture").default,
            name: "懒图",
            keywords: ["图片"]
          },
          {
            path: "/img",
            Component: require("@/pages/Pc/Img").default,
            name: "图片",
            keywords: ["图片"]
          },
          {
            path: "/qrcode",
            Component: require("@/pages/Pc/ImageQRCode").default,
            name: "二维码",
            keywords: ["图片", "二维码"]
          },
          {
            path: "/number",
            Component: require("@/pages/Pc/Number").default,
            name: "动态数字",
          },
          {
            path: "/verification",
            Component: require("@/pages/Pc/Verification").default,
            name: "验证码",
            keywords: ["输入框", "input"]
          },
        ]
      },
      {
        path: "/mobile",
        Component: require("@/pages/Mobile").default,
        name: "h5端",
      },
    ],
  },
];
export default routes;
