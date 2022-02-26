import {Dispatch} from "@/definitions/type";
import {namespace as pc} from "@/store/pc";

const action = {
  mapState(state: any) {
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
        return params["routerHistory"]["routers"][0]["children"][0]["children"]
          .map((e: any) => ({
            name: e.name,
            enName: e.path.replace("/", ""),
            path: e.path.toLowerCase().replace("/", "")
          }));
      }
    };
  }
};

export default action;
