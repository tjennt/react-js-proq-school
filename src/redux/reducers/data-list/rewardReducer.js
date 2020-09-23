import * as rewardTypes from "../../types/rewardTypes";
const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};

const DataRewardReducer = (state = initialState, action) => {
  switch (action.type) {
    case rewardTypes.GET_DATA_REWARD:
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

export default DataRewardReducer;
