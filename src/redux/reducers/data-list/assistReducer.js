import * as assType from "./../../constants/assistant";
const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};
const assistantReducer = (state = initialState, action) => {
  switch (action.type) {
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
