export const namespace = "pc";

export class State {
}

const store = {
  namespace,
  state: {},
  reducers: {
    init(state: State) {
      return {...state};
    },
  }
};
export default store;
