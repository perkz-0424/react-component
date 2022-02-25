import {Dispatch} from "@/definitions/type";
import {namespace as image} from "@/store/image";

const action = {
  mapState(state: any) {
    return {
      ...state[image],
    };
  },
  mapDispatch(dispatch: Dispatch) {
    return {
      setFileList(params: any){
        dispatch({type: `${image}/setFileList`, ...params});
      }
    };
  }
};

export default action;
