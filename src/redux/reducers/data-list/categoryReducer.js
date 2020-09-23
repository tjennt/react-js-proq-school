import * as categoryTypes from "./../../types/catagoryTypes";
const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};

const DataCateReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryTypes.GET_CATEGORY:
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
      };
    default:
      return state;
  }
};

export default DataCateReducer;
