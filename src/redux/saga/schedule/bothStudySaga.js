import { call, put } from "redux-saga/effects";
import { toastError, toastWarning } from "../../../utility/toast/toastHelper";
import { getDataBothStudySuccess } from "../../actions/schedule/getDataBothStudy";
import { getDataBothStudyApi } from "../../api/schedule/bothStudy";
export function* getDataBothStudySaga({ payload }) {
  const { state } = payload;
  const { days, nameClass, season, start_timeReq, end_timeReq } = state;

  // let timeStart = start_time ? moment(start_time).format("MM-DD-YYYY") : "";
  // let timeEnd = start_time ? moment(end_time).format("MM-DD-YYYY") : "";

  let arrDay = days.length && days.map((day) => day);
  const params = {
    classID: nameClass ? nameClass : "",
    startAt: start_timeReq,
    seasonID: season,
    endAt: end_timeReq,
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
    toastError("Ngày bắt đầu và kết thúc không thuộc trong kì học hiện tại");
  }
}
