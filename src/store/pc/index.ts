export const namespace = "pc";
const store = {
  namespace,
  state: {
    fileList: []
  },
  reducers: {
    init(state: any) {
      return {...state};
    },
    setFileList(state: any, {fileList}: { fileList: any[] }) {
      return {...state, fileList};
    },
  }
};
export default store;
