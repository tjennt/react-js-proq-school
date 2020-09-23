import * as tagTypes from "./../../types/tagTypes";
const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};

const DataTagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case tagTypes.GET_DATA_TAGS:
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
      };
    case tagTypes.ADD_TAGS:
      return {
        ...state,
        data: action.data,
      };
    case "DELETE_DATA_COUNT":
      let index = state.data.findIndex((item) => item.id === action.obj.id);
      let updatedData = [...state.data];
      updatedData.splice(index, 1);
      return {
        ...state,
        data: updatedData,
      };
    default:
      return state;
  }
};

export default DataTagsReducer;
