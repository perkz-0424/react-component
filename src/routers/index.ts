import config from "@/config";

const routes = [
  {
    path: "/",
    Component: require("@/pages").default,
    redirect: config.environment,
    children: [
      {
        path: "/pc",
        Component: require("@/pages/Pc").default,
        children: [
          {
            path: "/image",
            Component: require("@/pages/Pc/Image").default,
          },
          {
            path: "/imageCropper",
            Component: require("@/pages/Pc/ImageCropper").default,
          }
        ]
      },
      {
        path: "/mobile",
        Component: require("@/pages/Mobile").default,
      },
    ],
  },
];
export default routes;
