import {Dispatch} from "@/definitions/type";
import {namespace as mobile} from "@/store/mobile";

const action = {
  mapState(state: any) {
    return {
      ...state[mobile],
    };
  },
  mapDispatch(dispatch: Dispatch) {
    return{
      init() {
        dispatch({type: `${mobile}/init`});
      },
    }
  }
};

export default action;
