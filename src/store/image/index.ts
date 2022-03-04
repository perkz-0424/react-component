export const namespace = "image";
const icon = require("@/common/images/mxxz.jpg");

export class State {
  public fileList?: {
    uid: string;
    name: string;
    status: string;
    url: any;
  }[];
}

const store = {
  namespace,
  state: {
    fileList: [
      {
        uid: "done_icon",
        name: "icon.jpg",
        status: "done",
        url: icon,
      }
    ]
  },
  reducers: {
    setFileList(state: any, {fileList}: State) {
      console.log(state)
      return {...state, fileList};
    },
  }
};
export default store;
