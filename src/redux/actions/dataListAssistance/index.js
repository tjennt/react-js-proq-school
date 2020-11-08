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
export const getDataSubject = (params) => ({
  type: assisType.GET_DATA_SUBJECT_ASS,
  payload: {
    params,
  },
});
export const getDataSubjectSuccess = (data, total_page) => ({
  type: assisType.GET_DATA_SUBJECT_ASS_SUCCESS,
  payload: {
    data,
    total_page,
  },
});
export const getDataSubjectFaild = (error) => ({
  type: assisType.GET_DATA_SUBJECT_ASS_FAILD,
  payload: {
    error,
  },
});
/**
 * asssist stage
 */
export const getDataStage = (params) => ({
  type: assisType.GET_DATA_STAGE,
  payload: {
    params,
  },
});
export const getDataStageSuccss = (data, total_page) => ({
  type: assisType.GET_DATA_STAGE_SUCCESS,
  payload: {
    data,
    total_page,
  },
});
export const getDataStageFail = (error) => ({
  type: assisType.GET_DATA_STAGE_FAIL,
  payload: {
    error,
  },
});
/**
 * asssist season
 */
export const getDataSeason = (params) => ({
  type: assisType.GET_DATA_SEASON,
  payload: {
    params,
  },
});
export const getDataSeasonSuccss = (data, total_page) => ({
  type: assisType.GET_DATA_SEASON_SUCCESS,
  payload: {
    data,
    total_page,
  },
});
export const getDataSeasonFail = (error) => ({
  type: assisType.GET_DATA_SEASON_FAIL,
  payload: {
    error,
  },
});
