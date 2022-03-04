import {Dispatch} from "@/definitions/type";
import {namespace as mobile, State} from "@/store/mobile";

const action = {
  mapState(state: { [mobile]: State }) {
    return {
      ...state[mobile],
    };
  },
  mapDispatch(dispatch: Dispatch) {
    return {
      init() {
        dispatch({type: `${mobile}/init`});
      },
    };
  }
};

export default action;
