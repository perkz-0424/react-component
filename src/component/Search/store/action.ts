import {Dispatch} from "@/definitions/type";
import {namespace as search} from "@/component/Search/store";

const action = {
  mapState(state: any) {
    return {
      ...state[search],
    };
  },
  mapDispatch(dispatch: Dispatch) {
    return {
      init() {
        dispatch({type: `${search}/init`});
      },
    };
  }
};

export default action;
