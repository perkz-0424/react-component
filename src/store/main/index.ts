export const namespace = "main";

export class State {
}

const store = {
  namespace,
  state: {},
  reducers: {
    init(state: State) {
      return {
        ...state,
      };
    },
  }
};
export default store;
