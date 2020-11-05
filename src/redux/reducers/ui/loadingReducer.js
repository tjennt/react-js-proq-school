import * as uiType from "../../constants/ui";
let initialState = {
  showLoading: false,
};
const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case uiType.SHOW_LOADING: {
      return {
        ...state,
        showLoading: true,
      };
    }
    case uiType.HIDE_LOADING: {
      return {
        ...state,
        showLoading: false,
      };
    }
    default:
      return state;
  }
};
export default uiReducer;
