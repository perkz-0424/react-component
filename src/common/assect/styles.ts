import config from "@/config";

export const changeEnvironment = (id: string) => {
  if (config.environment !== id) {
    window.location.href = `${window.location.pathname.replace(id, config.environment)}${window.location.search}`;
    return;
  }
  const common = document.getElementById("common") as HTMLLinkElement;
  const examination = document.getElementById("mobile");
  const pc = document.getElementById("pc");
  examination && examination.remove();
  pc && pc.remove();
  const target = document.createElement("link");
  target.href = `${common.getAttribute("href")}`.replace("common", id);
  target.rel = "stylesheet";
  target.id = id;
  document.getElementsByTagName("head")[0].appendChild(target);
};
