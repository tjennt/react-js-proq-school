import * as adminType from "./../../types/adminTypes";
const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};
const getIndex = (arr, arr2, arr3, params = {}) => {
  if (arr2.length > 0) {
    let startIndex = arr.findIndex((i) => i.id === arr2[0].id) + 1;
    let endIndex = arr.findIndex((i) => i.id === arr2[arr2.length - 1].id) + 1;
    let finalArr = [startIndex, endIndex];
    return (arr3 = finalArr);
  } else {
    let finalArr = [arr.length - parseInt(params.perPage), arr.length];
    return (arr3 = finalArr);
  }
};

const DataAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_ADMIN":
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
        sortIndex: getIndex(action.data, action.params),
      };
    case "ADD_ADMIN":
      return {
        ...state,
        data: action.data,
      };
    case adminType.ADMIN_UPDATE:
      state.data.find((item) => {
        if (item.id === action.data.id) {
          return Object.assign(item, { ...action.data });
        } else {
          return item;
        }
      });
      return { ...state };
    default:
      return state;
  }
};

export default DataAdminReducer;
