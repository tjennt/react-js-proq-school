const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};

const DataUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_USER":
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

export default DataUserReducer;
