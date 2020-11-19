import {
  call,
  put,
  // put
} from "redux-saga/effects";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../../utility/toast/toastHelper";
import { getDataSchedules } from "../../actions/education";
import { addSchedulesApi } from "../../api/schedule/schedule";
export function* addSchedulesSaga({ payload }) {
  const { state, params } = payload;
  const {
    days,
    nameClass,
    ca,
    season,
    subject,
    teacher,
    start_timeReq,
    end_timeReq,
  } = state;

  // let arrDay = days.length && days.map((day) => day.value);
  const dataReq = {
    class: nameClass ? nameClass : "",
    season: season ? season : "",
    shift: ca ? ca : "",
    startAt: start_timeReq || "",
    endAt: end_timeReq || "",
    teacher: teacher ? teacher : "",
    subject: subject ? subject : "",
    weekDays: days,
  };
  try {
    const res = yield call(addSchedulesApi, dataReq);
    const { data } = res;
    if (data.success) {
      yield put(getDataSchedules(params));
      toastSuccess("Phân bố lịch học thành công");
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError("Đã có lỗi xảy ra vui lòng thử lại sau");
  }
}
