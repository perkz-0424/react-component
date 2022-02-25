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
      },
      {
        path: "/mobile",
        Component: require("@/pages/Mobile").default,
      },
    ],
  },
];
export default routes;
