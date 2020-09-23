import * as shopType from "../../types/shopTypes";
const initialState = {
  data: [],
  dataShopCategory: [],
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

const DataShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case shopType.GET_DATA_SHOP:
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params,
        sortIndex: getIndex(action.data, action.params),
      };
    case shopType.GET_DATA_SHOP_CATEGORY:
      return {
        ...state,
        dataShopCategory: action.data,
        params: action.params,
      };
    case "GET_ALL_DATA":
      return {
        ...state,
        allData: action.data,
        totalRecords: action.data.length,
        sortIndex: getIndex(action.data, state.data, state.sortIndex),
      };
    case "FILTER_DATA":
      let value = action.value;
      let filteredData = [];
      if (value.length) {
        filteredData = state.allData
          .filter((item) => {
            let startsWithCondition =
              item.name.toLowerCase().startsWith(value.toLowerCase()) ||
              item.category.toLowerCase().startsWith(value.toLowerCase()) ||
              item.price.toLowerCase().startsWith(value.toLowerCase()) ||
              item.order_status.toLowerCase().startsWith(value.toLowerCase());

            let includesCondition =
              item.name.toLowerCase().includes(value.toLowerCase()) ||
              item.category.toLowerCase().includes(value.toLowerCase()) ||
              item.price.toLowerCase().includes(value.toLowerCase()) ||
              item.order_status.toLowerCase().includes(value.toLowerCase());

            if (startsWithCondition) {
              return startsWithCondition;
            } else if (!startsWithCondition && includesCondition) {
              return includesCondition;
            } else return null;
          })
          .slice(state.params.page - 1, state.params.perPage);
        return { ...state, filteredData };
      } else {
        filteredData = state.data;
        return { ...state, filteredData };
      }
    case shopType.ADD_DATA_SHOP:
      return {
        ...state,
        data: action.data,
      };
    case shopType.UPDATE_DATA_SHOP:
      state.data.find((item) => {
        if (item.id === action.obj.id) {
          return Object.assign(item, { ...action.obj });
        } else {
          return item;
        }
      });
      return { ...state };
    case shopType.DELETE_DATA_SHOP:
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

export default DataShopReducer;
