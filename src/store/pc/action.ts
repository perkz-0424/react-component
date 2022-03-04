import {Dispatch} from "@/definitions/type";
import {namespace as pc, State} from "@/store/pc";

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
        const array = params["routerHistory"]["routers"][0]
        && params["routerHistory"]["routers"][0]["children"]
        && params["routerHistory"]["routers"][0]["children"][0]
        && params["routerHistory"]["routers"][0]["children"][0]["children"]
          ? params["routerHistory"]["routers"][0]["children"][0]["children"] : [];
        return array.map((e: any) => ({
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
