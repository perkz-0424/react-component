export const namespace = "image";
const store = {
  namespace,
  state: {
    fileList: []
  },
  reducers: {
    setFileList(state: any, {fileList}: { fileList: any[] }) {
      return {...state, fileList};
    },
  }
};
export default store;
