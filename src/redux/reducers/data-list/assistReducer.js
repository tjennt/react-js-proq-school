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
  total_item_subject: 0,
  dataClass: [],
  total_page_class: 0,
  total_record_class: 0,
  dataStage: [],
  total_page_stage: 0,
  total_record_stage: 0,
  dataSeason: [],
  total_page_season: 0,
  total_record_season: 0,
  setTaskEditClass: null,
  setTaskEditSubject: null,
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
      return {
        ...state,
        dataClass: data,
        total_page_class: total_page,
        total_record_class: total_record,
      };
    }
    case assType.SET_TASK_CLASS: {
      const { task } = action.payload;
      return {
        ...state,
        setTaskEditClass: task,
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
      const { data, total_page, total_item } = action.payload;
      return {
        ...state,
        dataSubject: data,
        total_page_subject: total_page,
        total_item_subject: total_item,
      };
    }
    case assType.SET_TASK_EDIT_SUBJECT: {
      const { task } = action.payload;
      return {
        ...state,
        setTaskEditSubject: task,
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
      const { data, total_page, total_record } = action.payload;
      return {
        ...state,
        dataStage: data,
        toal_page_stage: total_page,
        total_record_stage: total_record,
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
      const { data, total_page, total_item } = action.payload;
      return {
        ...state,
        dataSeason: data,
        total_page_season: total_page,
        total_record_season: total_item,
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
