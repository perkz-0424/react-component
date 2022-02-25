export const namespace = "search";

export default require("@/store/models").default({
  [namespace]: {
    namespace,
    state: {
      search: "",
      items: [],
      focus: false,
      loading: false,
    },
    reducers: {
      init(state: any) {
        return {...state};
      },
      setFocus(state: any, {focus}: { focus: boolean }) {
        return {...state, focus};
      },
      setItems(state: any, {items}: { items: any[] }) {
        return {...state, items};
      },
      setSearch(state: any, {search}: { search: string }) {
        return {...state, search};
      },
      setLoading(state: any, {loading}: { loading: boolean }) {
        return {...state, loading};
      },
    }
  },
});


