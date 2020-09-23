import * as blogType from "./../../types/BlogTypes";
const initialState = {
  data: [],
  TagToBlog: [],
  addDataSuccess: false,
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};

const moveIndex = (arr, from, to) => {
  let el = arr[from];
  arr.splice(from, 1);
  arr.splice(to, 0, el);
};

const DataBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case blogType.GET_DATA_BLOG:
      return {
        ...state,
        data: action.dataBlog,
        totalPages: action.totalPages,
        params: action.params,
      };
    case blogType.GET_TAG_TO_BLOG:
      return {
        ...state,
        TagToBlog: action.data,
      };
    case "ADD_DATA_TAG_BLOG":
      return {
        ...state,
        TagToBlog: action.data,
      };
    case "GET_ALL_DATA":
      return {
        ...state,
        allData: action.data,
        totalRecords: action.data.length,
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
    case blogType.ADD_DATA_BLOG:
      let id = state.data.slice(-1)[0].id + 1;
      state.data.push({
        ...action.obj,
        id,
      });
      moveIndex(
        state.data,
        state.data.findIndex((item) => item.id === id),
        0
      );
      return {
        ...state,
        data: state.data,
        addDataSuccess: true,
      };
    case blogType.UPDATE_DATA_BLOG:
      state.data.find((item) => {
        if (item.id === action.obj.id) {
          return Object.assign(item, { ...action.obj });
        } else {
          return item;
        }
      });
      return { ...state };
    case blogType.DELETE_DATA_BLOG:
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

export default DataBlogReducer;
