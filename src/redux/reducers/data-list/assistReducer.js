import * as assType from "./../../constants/assistant";
const initialState = {
  data: [],
  dataTeacher: [],
  dataschedules: [],
  dataSubject: [],
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
      const { data } = action.payload;
      return {
        ...state,
        data: data,
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
      const { data } = action.payload;
      return {
        ...state,
        dataschedules: data,
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
