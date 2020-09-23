import * as saleType from "../../types/salesTypes";
const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};
const DataSaleReducer = (state = initialState, action) => {
  switch (action.type) {
    case saleType.GET_DATA_SALE:
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

export default DataSaleReducer;
