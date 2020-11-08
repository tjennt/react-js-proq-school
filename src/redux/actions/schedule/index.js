import * as schedulesType from "../../constants/schedule/index";

export const addSchedules = (state, params) => ({
  type: schedulesType.ADD_SCHEDULES,
  payload: {
    state,
    params,
  },
});
