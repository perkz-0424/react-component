import {Dispatch} from "@/definitions/type";
import {namespace as pc} from "@/store/pc";

const action = {
  mapState(state: any) {
    return {
      ...state[pc],
    };
  },
  mapDispatch(dispatch: Dispatch) {
    return {
      init() {
        dispatch({type: `${pc}/init`});
      },
    };
  }
};

export default action;
