export const namespace = "image";
const mxxz = require("@/common/images/mxxz.jpg");

const store = {
  namespace,
  state: {
    fileList: [
      {
        uid: "done_mxxz",
        name: "mxxz.jpg",
        status: "done",
        url: mxxz,
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
