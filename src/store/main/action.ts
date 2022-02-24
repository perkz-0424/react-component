import {StateMain as State, Dispatch} from "@/definitions/type";
import {namespace as main} from "@/store/main";

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
