import * as countType from "../../types/countType";
const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};

const DataCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case countType.GET_DATA_COUNT:
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
      };

    case countType.DELETE_DATA_cOUNT:
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

export default DataCountReducer;
