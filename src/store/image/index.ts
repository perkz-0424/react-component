import {StoreState} from "@/definitions/store";

export const namespace = "image";
const icon = require("@/common/images/mxxz.jpg");


export type State = {
  fileList: { uid: string; name: string; status: string; url: any; [key: string]: any }[];
}

const store = {
  namespace,
  state: {
    fileList: [{uid: "done_icon", name: "icon.jpg", status: "done", url: icon}]
  } as State,
  reducers: {
    setFileList(state: StoreState, params: State) {
      return {...state, fileList: params.fileList};
    },
  }
};
export default store;
