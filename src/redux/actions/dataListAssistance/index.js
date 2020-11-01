import * as assisType from "../../constants/assistant";
/**
 * assistant student
 */
export const getData = (params) => ({
  type: assisType.GET_DATA_STUDENT_ASS,
  payload: {
    params,
  },
});
export const getDataSuccess = (data, total_page, total_record) => ({
  type: assisType.GET_DATA_STUDENT_ASS_SUCCE,
  payload: {
    data,
    total_page,
    total_record,
  },
});
export const getDataFaild = (error) => ({
  type: assisType.GET_DATA_STUDENT_ASS_FAILD,
  payload: {
    error,
  },
});
/**
 * assistant teacher
 */
export const getDataTeacher = (params) => ({
  type: assisType.GET_DATA_TEACHER_ASS,
  payload: {
    params,
  },
});
export const getDataTeacherSuccess = (data, total_page, total_record) => ({
  type: assisType.GET_DATA_TEACHER_ASS_SUCCESS,
  payload: {
    data,
    total_page,
    total_record,
  },
});
export const getDataTeacherFaild = (error) => ({
  type: assisType.GET_DATA_TEACHER_ASS_FAILD,
  payload: {
    error,
  },
});
/**
 * assistant class
 */
export const getDataClass = (params) => ({
  type: assisType.GET_DATA_CLASS_ASS,
  payload: {
    params,
  },
});
export const getDataClassSuccess = (data, total_page, total_record) => ({
  type: assisType.GET_DATA_CLASS_ASS_SUCCESS,
  payload: {
    data,
    total_page,
    total_record,
  },
});
export const getDataClassFaild = (error) => ({
  type: assisType.GET_DATA_CLASS_ASS_FAILD,
  payload: {
    error,
  },
});
/**
 * assistant subject
 */
export const getDataSubject = () => ({
  type: assisType.GET_DATA_SUBJECT_ASS,
});
export const getDataSubjectSuccess = (data) => ({
  type: assisType.GET_DATA_SUBJECT_ASS_SUCCESS,
  payload: {
    data,
  },
});
export const getDataSubjectFaild = (error) => ({
  type: assisType.GET_DATA_SUBJECT_ASS_FAILD,
  payload: {
    error,
  },
});
