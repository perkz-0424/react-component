import request from "axios";
import {authGetApi} from "@/service/proxy";

export function getOssToken() {
  return authGetApi("/report/oss");
}

export function postFileToOss(host: string, formData: any) {
  return request.post(`https://${host}`, formData, {headers: {}});
}
