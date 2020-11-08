import {
  call,
  // put
} from "redux-saga/effects";
import { toastError } from "../../../utility/toast/toastHelper";
// import { getDataBothStudySuccess } from "../../actions/schedule/getDataBothStudy";
// import { getDataBothStudyApi } from "../../api/schedule/bothStudy";
import { addSchedulesApi } from "../../api/schedule/schedule";
// import { getDataSemesterSuccess } from "../../actions/schedule/getDataSemster";
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
    console.log(res);
    // const { data } = res;
    // if (data.success) {

    // } else {
    // toastWarning("Vui lòng thử lại sau");
    // }
  } catch (error) {
    toastError("Đã có lỗi xảy ra vui lòng thử lại sau");
  }
}
