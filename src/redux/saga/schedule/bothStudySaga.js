import { call, put } from "redux-saga/effects";
import { toastError, toastWarning } from "../../../utility/toast/toastHelper";
import { getDataBothStudySuccess } from "../../actions/schedule/getDataBothStudy";
import { getDataBothStudyApi } from "../../api/schedule/bothStudy";
// import { getDataSemesterSuccess } from "../../actions/schedule/getDataSemster";
export function* getDataBothStudySaga({ payload }) {
  const { state } = payload;
  const { days, nameClass, start_time, end_time } = state;

  let arrDay = days.length && days.map((day) => day.value);
  const params = {
    classID: nameClass ? nameClass.value : "",
    startAt: start_time || "",
    endAt: end_time || "",
    days: arrDay.reduce((f, s) => `${f},${s}`),
  };
  try {
    const res = yield call(getDataBothStudyApi, params);
    const { data } = res;
    if (data.success) {
      const dataArr = data.payload.reduce(
        (arr, curr) => [...arr, { label: curr, value: curr }],
        []
      );
      yield put(getDataBothStudySuccess(dataArr));
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError("Đã có lỗi xảy ra vui lòng thử lại sau");
  }
}
