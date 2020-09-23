import * as voteAppTypes from "../../types/voteApp";
const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [],
};

const DataVoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case voteAppTypes.GET_DATA_VOTE_APP:
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

export default DataVoteReducer;
