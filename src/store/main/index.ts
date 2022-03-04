import {StoreState} from "@/definitions/store";

export const namespace = "main";

export type State = {}

const store = {
  namespace,
  state: {} as State,
  reducers: {
    init(state: StoreState, params: State) {
      return {...state};
    },
  }
};
export default store;
