import * as hotDealType from "../../types/hotdealTypes";
const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};

const DataHotDealReducer = (state = initialState, action) => {
  switch (action.type) {
    case hotDealType.GET_DATA_HOT_DEAL:
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
      };
    case hotDealType.DELETE_HOT_DEAL:
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

export default DataHotDealReducer;
