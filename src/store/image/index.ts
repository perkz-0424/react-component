export const namespace = "image";
const icon = require("@/common/images/mxxz.jpg");

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
    setFileList(state: any, {fileList}: { fileList: any[] }) {
      return {...state, fileList};
    },
  }
};
export default store;
