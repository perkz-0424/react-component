import {Dispatch} from "@/definitions/type";
import {namespace as image, State} from "@/store/image";

const action = {
  mapState(state: { [image]: State }) {
    return {
      ...state[image],
    };
  },
  mapDispatch(dispatch: Dispatch) {
    return {
      setFileList(params: any) {
        dispatch({type: `${image}/setFileList`, ...params});
      }
    };
  }
};

export default action;
