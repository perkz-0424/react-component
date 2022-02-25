import {Dispatch} from "@/definitions/type";
import {namespace as search} from "@/component/Search/store";
import {sleep} from "@/common/assect/util";

const getItemsBySearch = async (items: any[], s = "") => {
  if (!s || !items.length) {
    return items;
  } else {
    return items;
  }
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
          await dispatch({type: `${search}/setLoading`, loading: true});
          dispatch({type: `${search}/setItems`, items: i});
        }
      },
      async setSearch(s: string) {
        await dispatch({type: `${search}/setSearch`, search: s});
        const i = await getItemsBySearch(params.data, s);
        await dispatch({type: `${search}/setItems`, items: i});
      }
    };
  }
};

export default action;
