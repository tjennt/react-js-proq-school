import * as scheduleType from "../../constants/schedule/index";

const initialState = {
  dataSemester: [],
  dataSubject: [],
  dataBothStudy: [],
};
const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * semester
     */
    case scheduleType.GET_SEMESTER: {
      return {
        ...state,
      };
    }
    case scheduleType.GET_SEMESTER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        dataSemester: data,
      };
    }
    case scheduleType.GET_SEMESTER_FAIL: {
      return {
        ...state,
      };
    }
    /**
     * subject
     */
    case scheduleType.GET_SUBJECT_FROM_CLASS: {
      return {
        ...state,
      };
    }
    case scheduleType.GET_SUBJECT_FROM_CLASS_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        dataSubject: data,
      };
    }
    /**
     * both study
     */
    case scheduleType.GET_BOTHSTUDY: {
      return {
        ...state,
      };
    }
    case scheduleType.GET_BOTHSTUDY_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        dataBothStudy: data,
      };
    }
    default:
      return state;
  }
};
export default scheduleReducer;
