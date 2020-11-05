import { call } from "redux-saga/effects";
import { getDataSceduleApi } from "../../api/schedule/semester";
// import { getDataSemesterSuccess } from "../../actions/schedule/getDataSemster";
export function* getDataBothStudySaga({ payload }) {
  console.log(payload);
  const { data } = payload;
  let { end_time, start_time, days } = data;
  let arrDay = days.length && days.map((day) => day.value);
  console.log(end_time);
  let date_start = new Date(start_time).toISOString();
  let date_end = new Date(end_time).toISOString();
  console.log(
    { datestart: date_start },
    { dateend: date_end },
    { arrDay: arrDay }
  );
  try {
    const res = yield call();
  } catch (error) {}
}
