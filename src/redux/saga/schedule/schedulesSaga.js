import {
  call,
  // put
} from "redux-saga/effects";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../../utility/toast/toastHelper";
import { addSchedulesApi } from "../../api/schedule/schedule";
export function* addSchedulesSaga({ payload }) {
  const { state } = payload;
  const {
    days,
    nameClass,
    start_time,
    end_time,
    ca,
    season,
    subject,
    teacher,
  } = state;

  let arrDay = days.length && days.map((day) => day.value);
  const dataReq = {
    class: nameClass ? nameClass.value : "",
    season: season ? season.value : "",
    shift: ca ? ca.value : "",
    startAt: start_time || "",
    endAt: end_time || "",
    teacher: teacher ? teacher.value : "",
    subject: subject ? subject.value : "",
    weekDays: arrDay,
  };
  try {
    const res = yield call(addSchedulesApi, dataReq);
    const { data } = res;
    console.log(data);
    if (data.success) {
      toastSuccess("Phân bố lịch học thành công");
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError("Đã có lỗi xảy ra vui lòng thử lại sau");
  }
}
