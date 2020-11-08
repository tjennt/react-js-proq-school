import * as subjectType from "../../constants/schedule/index";

export const getDataSubject = (season, idClass) => ({
  type: subjectType.GET_SUBJECT_FROM_CLASS,
  payload: {
    season,
    idClass,
  },
});
export const getDataSubjectSuccess = (data) => ({
  type: subjectType.GET_SUBJECT_FROM_CLASS_SUCCESS,
  payload: {
    data,
  },
});
export const getDataSubjectFaild = (error) => ({
  type: subjectType.GET_SUBJECT_FROM_CLASS_FAIL,
  payload: {
    error,
  },
});
