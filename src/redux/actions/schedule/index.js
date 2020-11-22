import * as schedulesType from "../../constants/schedule/index";

export const addSchedules = (state, params) => ({
  type: schedulesType.ADD_SCHEDULES,
  payload: {
    state,
    params,
  },
});
export const updateSchedules = (state, params) => ({
  type: schedulesType.UPDATE_SCHEDULES,
  payload: {
    state,
    params,
  },
});
export const deleteSchedules = (id, params) => ({
  type: schedulesType.DELETE_SCHEDULES,
  payload: {
    id,
    params,
  },
});
