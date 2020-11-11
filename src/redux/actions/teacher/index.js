import * as teacherType from "../../constants/teacher";

export const getDataSchedulesTeacher = (params) => ({
  type: teacherType.GET_SCHEDULES_TEACHER,
  payload: {
    params,
  },
});
export const getDataSchedulesTeacherSuccess = (data, total_page) => ({
  type: teacherType.GET_SCHEDULES_TEACHER_SUCCESS,
  payload: {
    data,
    total_page,
  },
});
export const getDataSchedulesTeacherFail = (error) => ({
  type: teacherType.GET_SCHEDULES_TEACHER_FAIL,
  payload: {
    error,
  },
});
export const getDataSchedulesTeacherId = (params, id) => ({
  type: teacherType.GET_SCHEDULE_ID,
  payload: {
    params,
    id,
  },
});
export const getDataSchedulesTeacherIdSuccess = (data, total_page) => ({
  type: teacherType.GET_SCHEDULE_ID_SUCCESS,
  payload: {
    data,
    total_page,
  },
});
export const getDataSchedulesTeacherIdFail = (error) => ({
  type: teacherType.GET_SCHEDULE_ID_FAIL,
  payload: {
    error,
  },
});
export const schedule = (data, id) => ({
  type: teacherType.SCHEDULES,
  payload: {
    data,
    id,
  },
});
