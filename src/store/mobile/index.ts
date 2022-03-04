import {StoreState} from "@/definitions/store";

export const namespace = "mobile";

export type State = {}

const store = {
  namespace,
  state: {} as State,
  reducers: {
    init(state: StoreState) {
      return {
        ...state,
      };
    }
  }
};
export default store;
