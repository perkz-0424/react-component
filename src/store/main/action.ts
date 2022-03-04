import {Dispatch} from "@/definitions/type";
import {namespace as main, State} from "@/store/main";

const action = {
  mapState(state: { [main]: State }) {
    return {
      ...state[main],
    };
  },
  mapDispatch(dispatch: Dispatch, {routerHistory}: any) {
    return {
      init() {
        dispatch({type: `${main}/init`});
      },
    };
  },
};

export default action;
