import {Dispatch} from "@/definitions/type";
import {namespace as search} from "@/component/Search/store";

const action = {
  mapLocal: {
    time: null as NodeJS.Timeout | null,
    searchId:  `${Math.ceil(Math.random() * 100)}${new Date().getTime()}`,
    getItemsBySearch (items: any[], search = "") {
      console.log(this)
      return new Promise((resolve) => {
        action.mapLocal.time && clearTimeout(action.mapLocal.time);
        action.mapLocal.time = setInterval(() => {
          clearTimeout(action.mapLocal.time as NodeJS.Timeout);
          let tempItems: any = [];
          if (search) {
            items.forEach((item: any) => {
              if (item.name !== undefined && item.name.match(search)) {
                return tempItems.push(item);
              }
              if (item.path !== undefined && item.path.match(search)) {
                return tempItems.push(item);
              }
            });
          } else {
            tempItems = [...items];
          }
          return resolve(tempItems);
        }, 300);
      });
    }
  },
  mapState(state: any) {
    return {
      ...state[search],
      search_id: action.mapLocal.searchId,
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
          const i = await action.mapLocal.getItemsBySearch(items, s);
          await dispatch({type: `${search}/setLoading`, loading: false});
          await dispatch({type: `${search}/setItems`, items: i});
        }
      },
      async setSearch(s: string, v: any[]) {
        await dispatch({type: `${search}/setSearch`, search: s});
        if (!v) {
          await dispatch({type: `${search}/setLoading`, loading: true});
          const i = await action.mapLocal.getItemsBySearch(params.data, s);
          await dispatch({type: `${search}/setLoading`, loading: false});
          await dispatch({type: `${search}/setItems`, items: i});
        } else {
          await dispatch({type: `${search}/setItems`, items: v});
        }
      },
      getBlurBool(e: any) {
        if (e.path) {
          return !e.path.map((e: { id?: string }) => e.id).filter((e?: string) => e && e === action.mapLocal.searchId)[0];
        } else {
          const ids = [];
          (function a(t) {
            if (!!t.id) {
              ids.push(t.id);
            }
            if (t.parentNode) {
              a(t.parentNode);
            }
          })(e.target);
          return ids.findIndex((e) => e === action.mapLocal.searchId) === -1;
        }
      }
    };
  }
};

export default action;
