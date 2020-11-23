import { call } from "redux-saga/effects";
import { getDataScheduleStudentId } from "../../api/student";
export function* getDataSchedulesIdSaga({ payload }) {
  const { id, params } = payload;
  try {
    const res = yield call(getDataScheduleStudentId, id, params);
    console.log(res);
  } catch (error) {}
}
