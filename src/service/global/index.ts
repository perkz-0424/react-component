import request from "axios";
import {authGetApi} from "@/service/proxy";
import {ossToken} from "@/service/api";

export function getOssToken() {
  return authGetApi(ossToken);
}

export function postFileToOss(host: string, formData: any) {
  return request.post(`https://${host}`, formData, {headers: {}});
}
