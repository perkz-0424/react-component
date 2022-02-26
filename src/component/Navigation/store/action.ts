import {Dispatch} from "@/definitions/type";
import {namespace as navigation} from "@/component/Navigation/store";

const action = {
  mapState(state: any) {
    return {
      ...state[navigation],
    };
  },
  mapDispatch(dispatch: Dispatch) {
    return {
      init() {
        dispatch({type: `${navigation}/init`});
      },
      setOpen(open: boolean) {
        dispatch({type: `${navigation}/setOpen`, open});
      },
    };
  }
};

export default action;
