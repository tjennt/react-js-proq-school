import * as blogType from "../../constants/blog";

const initialtState = {
  dataCategory: null,
  dataAllBlog: [],
  total_page: 0,
  total_item: 0,
  setTaskEdit: null,
};
const rootBlog = (state = initialtState, action) => {
  switch (action.type) {
    case blogType.GET_CATEGORY: {
      return {
        ...state,
      };
    }
    case blogType.GET_CATEGORY_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        dataCategory: data,
      };
    }
    case blogType.GET_CATEGORY_FAIL: {
      return {
        ...state,
      };
    }
    case blogType.GET_ALL_NOTIFY: {
      return {
        ...state,
      };
    }
    case blogType.GET_ALL_NOTIFY_SUCCESS: {
      const { data, total_page, total_item } = action.payload;
      return {
        ...state,
        dataAllBlog: data,
        total_page: total_page,
        total_item: total_item,
      };
    }
    case blogType.SET_TASK_EDIT_BLOG: {
      const { data } = action.payload;
      return {
        ...state,
        setTaskEdit: data,
      };
    }
    default:
      return state;
  }
};
export default rootBlog;
