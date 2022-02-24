import {StateMain} from "@/definitions/type";

export const namespace = "main";

const store = {
  namespace,
  state: {},
  reducers: {
    init(state: StateMain) {
      return {
        ...state,
      };
    },
  }
};
export default store;
