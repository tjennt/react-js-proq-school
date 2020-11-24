import * as teacherType from "../../constants/teacher";
const initialState = {
  data: [],
  dataDetail: [],
  total_page: 0,
  total_item: 0,
  dataProfile: null,
};
const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case teacherType.GET_SCHEDULES_TEACHER: {
      return {
        ...state,
      };
    }
    case teacherType.GET_SCHEDULES_TEACHER_SUCCESS: {
      const { data, total_page } = action.payload;
      return {
        ...state,
        data: data,
        total_page: total_page,
      };
    }
    case teacherType.GET_SCHEDULES_TEACHER_FAIL: {
      return {
        ...state,
      };
    }
    case teacherType.GET_SCHEDULE_ID: {
      return {
        ...state,
      };
    }
    case teacherType.GET_SCHEDULE_ID_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        dataDetail: data,
      };
    }
    case teacherType.GET_PROFILE_TEACHER: {
      return {
        ...state,
      };
    }
    case teacherType.GET_PROFILE_TEACHER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        dataProfile: data,
      };
    }
    default:
      return state;
  }
};
export default teacherReducer;
