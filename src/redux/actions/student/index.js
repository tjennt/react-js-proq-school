import * as schedulesType from "../../constants/student";
export const getDataScheduleId = (id, params) => ({
  type: schedulesType.GET_DATA_SCHEDULE_STUDENT_ID,
  payload: {
    id,
    params,
  },
});
export const getDataScheduleSuccss = (data, total_page) => ({
  type: schedulesType.GET_DATA_SCHEDULE_STUDENT_ID_SUCCESS,
  payload: {
    data,
    total_page,
  },
});

export const getDataScheduleDetailId = (id, params) => ({
  type: schedulesType.GET_DATA_SCHEDULE_STUDENT_ID_DETAIL,
  payload: {
    id,
    params,
  },
});
export const getDataScheduleDetailIdSuccess = (data, total_page) => ({
  type: schedulesType.GET_DATA_SCHEDULE_STUDENT_ID_DETAIL_SUCCESS,
  payload: {
    data,
    total_page,
  },
});
export const getDataScheduleAll = (params) => ({
  type: schedulesType.GET_DATA_SCHEDULE_STUDENT_ALL,
  payload: {
    params,
  },
});
export const getDataScheduleAllSuccess = (data, total_page) => ({
  type: schedulesType.GET_DATA_SCHEDULE_STUDENT_ALL_SUCCESS,
  payload: {
    data,
    total_page,
  },
});
export const getDataProfileStudent = () => ({
  type: schedulesType.GET_DATA_PROFILE_STUDENT,
});
export const getDataProfileStudentSuccess = (data) => ({
  type: schedulesType.GET_DATA_PROFILE_sTUDENT_SUCCESS,
  payload: {
    data,
  },
});
