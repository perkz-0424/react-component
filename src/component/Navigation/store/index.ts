export const namespace = "navigation";

export default require("@/store/models").default({
  [namespace]: {
    namespace,
    state: {
      open: true,
    },
    reducers: {
      init(state: any) {
        return {...state};
      },
      setOpen(state: any, {open}: { open: boolean }) {
        return {...state, open};
      },
    }
  },
});


