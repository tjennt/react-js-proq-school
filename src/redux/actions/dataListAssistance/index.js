import * as assisType from "../../constants/assistant";
export const getData = () => ({
  type: assisType.GET_DATA_STUDENT_ASS,
});
export const getDataSuccess = (data) => ({
  type: assisType.GET_DATA_STUDENT_ASS_SUCCE,
  payload: {
    data,
  },
});
export const getDataFaild = (error) => ({
  type: assisType.GET_DATA_STUDENT_ASS_FAILD,
  payload: {
    error,
  },
});
