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
        redirect: "image",
        name: "pc端",
        children: [
          {
            path: "/image",
            Component: require("@/pages/Pc/Image").default,
            name: "图片上传"
          },
          {
            path: "/imageCropper",
            Component: require("@/pages/Pc/ImageCropper").default,
            name: "图片裁剪"
          }
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
