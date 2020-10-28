import * as assType from "./../../constants/assistant";
const initialState = {
  data: [],
  total_page_student: 0,
  total_record_student: 0,
  dataTeacher: [],
  dataSubject: [],
  dataClass: [],
  total_page_class: 0,
  total_record_class: 0,
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
      const { data } = action.payload;
      return {
        ...state,
        dataTeacher: data,
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
    /**
     * assistant class
     */
    case assType.GET_DATA_SUBJECT_ASS: {
      return {
        ...state,
      };
    }
    case assType.GET_DATA_SUBJECT_ASS_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        dataSubject: data,
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
