import * as bothStudyType from "../../constants/schedule/index";
export const getDataSpecialization = (params) => ({
  type: bothStudyType.GET_SPECIALIZATION,
  payload: {
    params,
  },
});
export const getDataSpecializationSuccess = (data, total_page) => ({
  type: bothStudyType.GET_SPECIALIZATION_SUCCESS,
  payload: {
    data,
    total_page,
  },
});
export const getDataSpecializationFaild = (error) => ({
  type: bothStudyType.GET_SPECIALIZATION_FAIL,
  payload: {
    error,
  },
});
