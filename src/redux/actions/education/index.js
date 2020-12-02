import * as educationType from "../../constants/education";
/**
 * get schedules
 */
export const getDataSchedules = (params) => ({
  type: educationType.GET_DATA_SCHEDULES,
  payload: {
    params,
  },
});
export const getDataSchedulesSuccess = (data, total_page) => ({
  type: educationType.GET_DATA_SCHEDULES_SUCCESS,
  payload: {
    data,
    total_page,
  },
});
export const getDataSchedulesFail = (error) => ({
  type: educationType.GET_DATA_SCHEDULES_FAIL,
  payload: {
    error,
  },
});
export const importExcelStudent = (file, params) => ({
  type: educationType.IMPORT_EXCEL_STUDENT,
  payload: {
    file,
    params,
  },
});
export const importExcelClass = (file, params) => ({
  type: educationType.IMPORT_EXCEL_CLASS,
  payload: {
    file,
    params,
  },
});

export const importExcelTeacer = (file, params) => ({
  type: educationType.IMPORT_EXCEL_TEACHER,
  payload: {
    file,
    params,
  },
});
/**
 * create class
 */
export const addClass = (obj, params) => ({
  type: educationType.ADD_CLASS,
  payload: {
    obj,
    params,
  },
});
/**
 * create subject
 */
export const addSubject = (obj, params) => ({
  type: educationType.ADD_SUBJECT,
  payload: {
    obj,
    params,
  },
});
/**
 * create stage
 */
export const addStage = (obj, params) => ({
  type: educationType.CREATE_STAGE,
  payload: {
    obj,
    params,
  },
});
/**
 * create season
 */
export const addSeason = (obj, params) => ({
  type: educationType.CREATE_SEASON,
  payload: {
    obj,
    params,
  },
});
export const setTaskSeason = (task) => ({
  type: educationType.SET_TASK_SEASON,
  payload: {
    task,
  },
});
export const updateSeason = (obj, params) => ({
  type: educationType.UPDATE_SEASON,
  payload: {
    obj,
    params,
  },
});
export const deleteSeason = (obj, params) => ({
  type: educationType.DELETE_TASK_SEASON,
  payload: {
    obj,
    params,
  },
});
/**
 * create specail
 */
export const addSpecialization = (obj, params) => ({
  type: educationType.ADD_SEPCIALIZATION,
  payload: {
    obj,
    params,
  },
});
export const updateSpecialization = (obj, params) => ({
  type: educationType.UPDATE_SEPCIALIZATION,
  payload: {
    obj,
    params,
  },
});
export const deleteSpecialization = (obj, params) => ({
  type: educationType.DELETE_SEPCIALIZATION,
  payload: {
    obj,
    params,
  },
});
