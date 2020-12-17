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
import {
  addSchedulesApi,
  deleteSchedulesApi,
  updateSchedulesApi,
} from "../../api/schedule/schedule";
import * as moment from "moment";
import { message } from "antd";
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
export function* updateSchedulesSaga({ payload }) {
  const { state, params } = payload;
  const {
    id,
    days,
    // nameClass,
    ca,
    // season,
    subject,
    teacher,
    start_timeReq,
    end_timeReq,
  } = state;

  // let arrDay = days.length && days.map((day) => day.value);
  const dataReq = {
    // class: nameClass ? nameClass : "",
    // season: season ? season : "",
    shift: ca ? ca : "",
    startAt: moment(start_timeReq).format("MM-DD-YYYY") || "",
    endAt: moment(end_timeReq).format("MM-DD-YYYY") || "",
    teacher: teacher ? teacher : "",
    subject: subject ? subject : "",
    weekDays: days,
  };
  try {
    const res = yield call(updateSchedulesApi, id, dataReq);
    const { data } = res;
    if (data.success) {
      yield put(getDataSchedules(params));
      toastSuccess("Cập nhật lịch học thành công");
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError("Đã có lỗi xảy ra vui lòng thử lại sau");
  }
}
export function* deleteScheduleSaga({ payload }) {
  const { id, params } = payload;
  try {
    const res = yield call(deleteSchedulesApi, id);
    const { data } = res;
    if (data.success) {
      yield put(getDataSchedules(params));
      message.success("Xóa thành công !!!!");
    }
  } catch (error) {}
}
