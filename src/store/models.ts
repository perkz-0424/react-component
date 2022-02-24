import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

// 创建数据源
const createState = (map: any) => {
  const newMap = {...map};
  const newReducers: any = {};
  Object.entries(newMap.reducers).forEach((item) => {
    newReducers[`${newMap["namespace"]}/${item[0]}`] = item[1];
  });
  newReducers[`${newMap["namespace"]}/setState`] = (_state: any, {state}: any) => {
    return {..._state, ...state};
  };
  newMap.reducers = newReducers;
  return (state = newMap.state, action: any) => {
    if (newMap.reducers[action.type]) {
      return newMap.reducers[action.type](state, action);
    } else {
      return state;
    }
  }
}
// namespace区分各个数据源
const createReducers = (reducers: any) => {
  const newReducers: any = {};
  Object.keys(reducers).forEach((key) => {
    newReducers[reducers[key]["namespace"]] = createState(reducers[key])
  });
  return newReducers
}

// 创建数据仓库
const createStores = (stores: any) => {
  return createStore(combineReducers(createReducers({
    ...stores
  })), applyMiddleware(thunk));
}
export default createStores;
