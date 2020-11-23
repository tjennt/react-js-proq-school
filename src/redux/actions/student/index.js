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
