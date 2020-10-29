import * as tranType from "../../constants/tranc";
const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};

const DataTransacReducer = (state = initialState, action) => {
  switch (action.type) {
    case tranType.GET_DATA_TRANSACTION:
      return {
        ...state,
      };
    case tranType.GET_DATA_TRANSACTION_SUCCESS: {
      const { data, totalPages } = action.payload;
      return {
        ...state,
        data: data,
        totalPages: totalPages,
        params: action.params,
      };
    }

    default:
      return state;
  }
};

export default DataTransacReducer;
