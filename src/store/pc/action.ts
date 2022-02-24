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
      setFileList(params: any){
        dispatch({type: `${pc}/setFileList`, ...params});
      }
    };
  }
};

export default action;
