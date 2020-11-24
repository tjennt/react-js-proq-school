import * as studentType from "../../constants/student";
const initialState = {
  data: [],
  total_page: 0,
  dataDetail: [],
  total_page_detail: 0,
  dataAllSchedule: [],
  dataProfile: null,
};
const schedule = (state = initialState, action) => {
  switch (action.type) {
    case studentType.GET_DATA_SCHEDULE_STUDENT_ID: {
      return {
        ...state,
      };
    }
    case studentType.GET_DATA_SCHEDULE_STUDENT_ID_SUCCESS: {
      const { data, total_page } = action.payload;
      return {
        ...state,
        data: data,
        total_page: total_page,
      };
    }
    case studentType.GET_DATA_SCHEDULE_STUDENT_ID_DETAIL: {
      return {
        ...state,
      };
    }
    case studentType.GET_DATA_SCHEDULE_STUDENT_ID_DETAIL_SUCCESS: {
      const { data, total_page } = action.payload;
      return {
        ...state,
        dataDetail: data,
        total_page_detail: total_page,
      };
    }
    case studentType.GET_DATA_SCHEDULE_STUDENT_ALL: {
      return {
        ...state,
      };
    }
    case studentType.GET_DATA_SCHEDULE_STUDENT_ALL_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        dataAllSchedule: data,
      };
    }
    case studentType.GET_DATA_PROFILE_STUDENT: {
      return {
        ...state,
      };
    }
    case studentType.GET_DATA_PROFILE_sTUDENT_SUCCESS: {
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
export default schedule;
