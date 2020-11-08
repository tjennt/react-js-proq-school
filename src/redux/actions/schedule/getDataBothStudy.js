import * as bothStudyType from "../../constants/schedule/index";
export const getDataBothStudy = (state) => ({
  type: bothStudyType.GET_BOTHSTUDY,
  payload: {
    state,
  },
});
export const getDataBothStudySuccess = (data) => ({
  type: bothStudyType.GET_BOTHSTUDY_SUCCESS,
  payload: {
    data,
  },
});
export const getDataBothStudyFaild = (error) => ({
  type: bothStudyType.GET_BOTHSTUDY_FAIL,
  payload: {
    error,
  },
});
