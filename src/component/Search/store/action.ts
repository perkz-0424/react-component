import {Dispatch} from "@/definitions/type";
import {namespace as search} from "@/component/Search/store";

let timer: NodeJS.Timeout | null = null;
const getItemsBySearch = (items: any[], s = "") => {
  return new Promise((resolve) => {
    timer && clearTimeout(timer);
    timer = setInterval(() => {
      clearTimeout(timer as NodeJS.Timeout);
      let tempItems: any = [];
      if (s) {
        items.forEach((item: any) => {
          if (item.name !== undefined && item.name.match(s)) {
            return tempItems.push(item);
          }
          if (item.path !== undefined && item.path.match(s)) {
            return tempItems.push(item);
          }
        });
      } else {
        tempItems = [...items];
      }
      return resolve(tempItems);
    }, 500);
  });
};
const action = {
  mapState(state: any) {
    return {
      ...state[search],
    };
  },
  mapDispatch(dispatch: Dispatch, params: any) {
    return {
      init() {
        dispatch({type: `${search}/init`});
      },
      setFocus(focus: boolean) {
        dispatch({type: `${search}/setFocus`, focus});
      },
      async setItems(items: any[], s = "") {
        if (!s || !items.length) {
          dispatch({type: `${search}/setItems`, items});
        } else {
          await dispatch({type: `${search}/setLoading`, loading: true});
          const i = await getItemsBySearch(items, s);
          await dispatch({type: `${search}/setLoading`, loading: false});
          await dispatch({type: `${search}/setItems`, items: i});
        }
      },
      async setSearch(s: string, v: any[]) {
        await dispatch({type: `${search}/setSearch`, search: s});
        if (!v) {
          await dispatch({type: `${search}/setLoading`, loading: true});
          const i = await getItemsBySearch(params.data, s);
          await dispatch({type: `${search}/setLoading`, loading: false});
          await dispatch({type: `${search}/setItems`, items: i});
        } else {
          await dispatch({type: `${search}/setItems`, items: v});
        }
      }
    };
  }
};

export default action;
