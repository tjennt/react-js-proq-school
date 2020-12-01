import * as blogType from "../../constants/blog";

const initialtState = {
  dataCategory: null,
  dataAllBlog: [],
  total_page: 0,
  total_item: 0,
  setTaskEdit: null,
  dataNotiFee: [],
  total_page_fee: 0,
  dataNotiActivity: [],
  total_page_activity: 0,
  dataNotiLearning: [],
  total_page_learning: 0,
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
    case blogType.GET_NOTI_FEE_STUDENT: {
      return {
        ...state,
      };
    }
    case blogType.GET_NOTI_FEE_STUDENT_SUCCESS: {
      const { data, total_page } = action.payload;
      return {
        ...state,
        dataNotiFee: data,
        total_page_fee: total_page,
      };
    }
    case blogType.GET_NOTI_ACTIVITY_STUDENT: {
      return {
        ...state,
      };
    }
    case blogType.GET_NOTI_ACTIVITY_STUDENT_SUCCESS: {
      const { data, total_page } = action.payload;
      return {
        ...state,
        dataNotiActivity: data,
        total_page_activity: total_page,
      };
    }
    case blogType.GET_NOTI_LEARNING_STUDENT: {
      return {
        ...state,
      };
    }
    case blogType.GET_NOTI_LEARNING_STUDENT_SUCCESS: {
      const { data, total_page } = action.payload;
      return {
        ...state,
        dataNotiLearning: data,
        total_page_learning: total_page,
      };
    }
    default:
      return state;
  }
};
export default rootBlog;
