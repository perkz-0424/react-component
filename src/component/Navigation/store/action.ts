import {Dispatch} from "@/definitions/type";
import {namespace as navigation} from "@/component/Navigation/store";

const action = {
  mapState(state: any) {
    return {
      ...state[navigation],
    };
  },
  mapDispatch(dispatch: Dispatch, params: any) {
    return {
      init() {
        dispatch({type: `${navigation}/init`});
      },
      setOpen(open: boolean) {
        dispatch({type: `${navigation}/setOpen`, open});
      },
      sortMenus() {
        const keywordsGroup: any = {};
        params.data.forEach((i: any) => {
          if (i.keywords && i.keywords[0]) {
            keywordsGroup[i.keywords[0]] = keywordsGroup[i.keywords[0]] ? [...keywordsGroup[i.keywords[0]], i] : [i];
          } else {
            keywordsGroup["其他"] = keywordsGroup["其他"] ? [...keywordsGroup["其他"], i] : [i];
          }
        });
        const group = Object.entries(keywordsGroup).map(([name, value], index) => ({
          name,
          key: name === "其他" ? -1 : index,
          children: value
        }));
        return group.sort((a, b) => b.key - a.key);
      }
    };
  }
};

export default action;
