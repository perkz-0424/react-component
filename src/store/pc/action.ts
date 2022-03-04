import {Dispatch} from "@/definitions/type";
import {namespace as pc, State} from "@/store/pc";
import {getObjValue} from "@/common/assect/util";

const action = {
  mapState(state: { [pc]: State }) {
    return {
      ...state[pc],
    };
  },
  mapDispatch(dispatch: Dispatch, params: any) {
    return {
      init() {
        dispatch({type: `${pc}/init`});
      },
      getSearchData() {
        const array = getObjValue(params, ".routerHistory.routers.0.children.0.children");
        return (array ? array : []).map((e: any) => ({
          name: e.name,
          enName: e.path.replace("/", ""),
          path: e.path.toLowerCase().replace("/", ""),
          keywords: e.keywords
        }));
      }
    };
  }
};

export default action;
