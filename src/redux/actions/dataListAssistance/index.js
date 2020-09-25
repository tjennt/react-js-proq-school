import * as assisType from "../../constants/assistant";
/**
 * assistant student
 */
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
/**
 * assistant teacher
 */
export const getDataTeacher = () => ({
  type: assisType.GET_DATA_TEACHER_ASS,
});
export const getDataTeacherSuccess = (data) => ({
  type: assisType.GET_DATA_TEACHER_ASS_SUCCESS,
  payload: {
    data,
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
export const getDataClass = () => ({
  type: assisType.GET_DATA_CLASS_ASS,
});
export const getDataClassSuccess = (data) => ({
  type: assisType.GET_DATA_CLASS_ASS_SUCCESS,
  payload: {
    data,
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
