import { call } from "redux-saga/effects";
import { getDataSceduleApi } from "../../api/schedule/semester";
// import { getDataSemesterSuccess } from "../../actions/schedule/getDataSemster";
export function* getDataSemesterSaga() {
  console.log("semester");
  try {
    const res = yield call();
  } catch (error) {}
}
