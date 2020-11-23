import * as studentType from "../../constants/student";
const initialState = {
  data: [],
  total_page: 0,
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
    default:
      return state;
  }
};
export default schedule;
