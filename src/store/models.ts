import thunk from "redux-thunk";
import {createStore, combineReducers, applyMiddleware, Store} from "redux";
import {StoreStores, StoreReducers, StoreMap, StoreState} from "@/definitions/store";

// 创建数据源
const createState = <T>(map: StoreMap): StoreReducers => {
  const newMap = {...map};
  const newReducers: StoreReducers = {};
  Object.entries(newMap.reducers).forEach((item) => {
    newReducers[`${newMap["namespace"]}/${item[0]}`] = item[1];
  });
  newReducers[`${newMap["namespace"]}/setState`] = (_state: StoreState, {state}: { state: StoreState }) => {
    return {..._state, ...state};
  };
  newMap.reducers = newReducers;
  return (state = newMap.state, action: { type: string }) => {
    if (newMap.reducers[action.type]) {
      return newMap.reducers[action.type](state, action);
    } else {
      return state;
    }
  };
};

// namespace区分各个数据源
const createReducers = (reducers: StoreStores): StoreReducers => {
  const newReducers: StoreReducers = {};
  Object.keys(reducers).forEach((key) => {
    newReducers[reducers[key]["namespace"]] = createState(reducers[key]);
  });
  return newReducers;
};

// 创建数据仓库
const createStores = (stores: StoreStores): Store => {
  return createStore(combineReducers(createReducers({
    ...stores
  })), applyMiddleware(thunk));
};
export default createStores;
