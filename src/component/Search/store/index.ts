export const namespace = "search";

export default require("@/store/models").default({
  [namespace]: {
    namespace,
    state: {
      search: "",

    },
    reducers: {
      init(state: any) {
        return {
          ...state,
        };
      }
    }
  },
});


