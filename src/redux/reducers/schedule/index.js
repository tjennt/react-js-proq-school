import * as scheduleType from "../../constants/schedule/index";
import * as listScheduleType from "../../constants/education";
const initialState = {
  dataSemester: [],
  dataSubject: [],
  dataBothStudy: [],
  dataSpecial: [],
  setTaskDataSpecial: null,
  dataSchedules: [],
  total_page_schedule: [],
  total_page_special: 0,
  total_record_special: 0,
  total_count_schedule: 0,
  setTaskSeason: null,
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
    /**
     * specialization
     */
    case scheduleType.GET_SPECIALIZATION: {
      return {
        ...state,
      };
    }
    case scheduleType.GET_SPECIALIZATION_SUCCESS: {
      const { data, total_page, total_record } = action.payload;
      return {
        ...state,
        dataSpecial: data,
        total_page_special: total_page,
        total_record_special: total_record,
      };
    }
    case listScheduleType.SET_TASK_SEASON: {
      const { task } = action.payload;
      return {
        ...state,
        setTaskSeason: task,
      };
    }
    case scheduleType.SET_TASK_SPECIALIZATION: {
      const { task } = action.payload;
      return {
        ...state,
        setTaskDataSpecial: task,
      };
    }
    // schedules
    case listScheduleType.GET_DATA_SCHEDULES: {
      return {
        ...state,
      };
    }
    case listScheduleType.GET_DATA_SCHEDULES_SUCCESS: {
      const { data, total_page } = action.payload;
      return {
        ...state,
        dataSchedules: data,
        total_page_schedule: total_page,
      };
    }
    default:
      return state;
  }
};
export default scheduleReducer;
