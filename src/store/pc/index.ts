import {StoreState} from "@/definitions/store";

export const namespace = "pc";

export type State = {}

const store = {
  namespace,
  state: {} as State,
  reducers: {
    init(state: StoreState) {
      return {...state};
    },
  }
};
export default store;
