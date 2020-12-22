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
export const exportExcelStudent = (classArr, nameFile) => ({
  type: assisType.EXPORT_EXCEL_STUDENT,
  payload: {
    classArr,
    nameFile,
  },
});
export const updateDataStudent = (params, obj) => ({
  type: assisType.UPDATE_DATA_STUDENT,
  payload: {
    params,
    obj,
  },
});

export const uploadFile = (file) => ({
  type: "UPLOAD_FILE",
  payload: file,
});

export const deleteDataStudent = (id, params) => ({
  type: assisType.DELETE_DATA_STUDENT,
  payload: {
    id,
    params,
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
export const exportExcelTeacher = (nameFile) => ({
  type: assisType.EXPORT_EXCEL_TEACHER,
  payload: {
    nameFile,
  },
});
export const updateDataTeacher = (obj, params) => ({
  type: assisType.UPDATE_DATA_TEACHER,
  payload: {
    obj,
    params,
  },
});
export const deleteDataTeacher = (id, params) => ({
  type: assisType.DELETE_DATA_TEACHER,
  payload: {
    id,
    params,
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
export const updateDataClass = (obj, params) => ({
  type: assisType.UPDATE_DATA_CLASS,
  payload: {
    obj,
    params,
  },
});
export const deleteDataClass = (id, params) => ({
  type: assisType.DELETE_DATA_CLASS,
  payload: {
    id,
    params,
  },
});
export const setTaskEditClass = (task) => ({
  type: assisType.SET_TASK_CLASS,
  payload: {
    task,
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
export const getDataSubjectSuccess = (data, total_page, total_item) => ({
  type: assisType.GET_DATA_SUBJECT_ASS_SUCCESS,
  payload: {
    data,
    total_page,
    total_item,
  },
});
export const getDataSubjectFaild = (error) => ({
  type: assisType.GET_DATA_SUBJECT_ASS_FAILD,
  payload: {
    error,
  },
});
export const updateDataSubject = (obj, params) => ({
  type: assisType.UPDATE_DATA_SUBJECT,
  payload: {
    obj,
    params,
  },
});
export const setTaskEditSubject = (task) => ({
  type: assisType.SET_TASK_EDIT_SUBJECT,
  payload: {
    task,
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
export const getDataStageSuccss = (data, total_page, total_record) => ({
  type: assisType.GET_DATA_STAGE_SUCCESS,
  payload: {
    data,
    total_page,
    total_record,
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
export const getDataSeasonSuccss = (data, total_page, total_item) => ({
  type: assisType.GET_DATA_SEASON_SUCCESS,
  payload: {
    data,
    total_page,
    total_item,
  },
});
export const getDataSeasonFail = (error) => ({
  type: assisType.GET_DATA_SEASON_FAIL,
  payload: {
    error,
  },
});
