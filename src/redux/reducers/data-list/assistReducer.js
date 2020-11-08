import * as assType from "./../../constants/assistant";
const initialState = {
  data: [],
  total_page_student: 0,
  total_record_student: 0,
  dataTeacher: [],
  total_page_teacher: 0,
  total_record_teacher: 0,
  dataSubject: [],
  total_page_subject: 0,
  dataClass: [],
  total_page_class: 0,
  total_record_class: 0,
  dataStage: [],
  total_page_stage: 0,
  dataSeason: [],
  total_page_season: 0,
};
const assistantReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * assistant studnet
     */
    case assType.GET_DATA_STUDENT_ASS:
      return {
        ...state,
      };
    case assType.GET_DATA_STUDENT_ASS_SUCCE: {
      const { data, total_page, total_record } = action.payload;
      return {
        ...state,
        data: data,
        total_page_student: total_page,
        total_record_student: total_record,
      };
    }
    /**
     * assistant teacher
     */
    case assType.GET_DATA_TEACHER_ASS: {
      return {
        ...state,
      };
    }
    case assType.GET_DATA_TEACHER_ASS_SUCCESS: {
      const { data, total_page, total_record } = action.payload;
      return {
        ...state,
        dataTeacher: data,
        total_page_teacher: total_page,
        total_record_teacher: total_record,
      };
    }
    /**
     * assistant class
     */
    case assType.GET_DATA_CLASS_ASS: {
      return {
        ...state,
      };
    }
    case assType.GET_DATA_CLASS_ASS_SUCCESS: {
      const { data, total_page, total_record } = action.payload;
      console.log(data);
      return {
        ...state,
        dataClass: data,
        total_page_class: total_page,
        total_record_class: total_record,
      };
    }
    /**
     * assistant subject
     */
    case assType.GET_DATA_SUBJECT_ASS: {
      return {
        ...state,
      };
    }
    case assType.GET_DATA_SUBJECT_ASS_SUCCESS: {
      const { data, total_page } = action.payload;
      return {
        ...state,
        dataSubject: data,
        total_page_subject: total_page,
      };
    }
    /**
     * assistant stage
     */
    case assType.GET_DATA_STAGE: {
      return {
        ...state,
      };
    }
    case assType.GET_DATA_STAGE_SUCCESS: {
      const { data, total_page } = action.payload;
      return {
        ...state,
        dataStage: data,
        toal_page_stage: total_page,
      };
    }
    /**
     * assistant season
     */
    case assType.GET_DATA_SEASON: {
      return {
        ...state,
      };
    }
    case assType.GET_DATA_SEASON_SUCCESS: {
      const { data, total_page } = action.payload;
      return {
        ...state,
        dataSeason: data,
        total_page_season: total_page,
      };
    }
    case "ADD_ADMIN":
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default assistantReducer;
