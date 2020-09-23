const initialState = {
  dataDashboard: [],
  dataTotalProduct: [],
  staticTotalProduct: null,
  staticTotalUser: null,
  staticTotalMoney: null,
  staticTotalUserLogin: null,
};

const DataTotalProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_TOTAL_DASHBOARD":
      return {
        ...state,
        dataDashboard: action.data,
      };
    case "GET_DATA_TOTAL_PRODUCTS":
      return {
        ...state,
        dataTotalProduct: action.data,
        staticTotalProduct: action.static,
      };
    case "GET_DATA_TOTAL_MONEY":
      return {
        ...state,
        dataTotalUser: action.data,
        staticTotalMoney: action.static,
      };
    case "GET_DATA_TOTAL_USER":
      return {
        ...state,
        staticTotalUser: action.static,
      };
    case "GET_DATA_TOTAL_USER_LOGIN":
      return {
        ...state,
        staticTotalUserLogin: action.data,
      };
    default:
      return state;
  }
};

export default DataTotalProductReducer;
