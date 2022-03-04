import createStores from "@/store/models";

export const namespace = "navigation";

export default createStores({
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


