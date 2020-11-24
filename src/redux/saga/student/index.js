import { call, put } from "redux-saga/effects";
import { toastError } from "../../../utility/toast/toastHelper";
import {
  getDataProfileStudentSuccess,
  getDataScheduleAllSuccess,
  getDataScheduleDetailIdSuccess,
  getDataScheduleSuccss,
} from "../../actions/student";
import {
  getDataScheduleStudent,
  getDataScheduleStudentDetail,
  getDataScheduleStudentId,
  getDataProfileStudent,
} from "../../api/student";
export function* getDataSchedulesIdSaga({ payload }) {
  const { id, params } = payload;
  try {
    const res = yield call(getDataScheduleStudentId, id, params);
    console.log(res);
    const { data } = res;
    if (data.success) {
      const dataRes = data.payload.reduce(
        (arr, curr) => [
          ...arr,
          {
            class: curr.class.name,
            subject: curr.subject.name,
            teacher: curr.teacher.name,
            day: curr.weekDays,
            shift: curr.shift,
            start_at: curr.startAt,
            endAt: curr.endAt,
            id: curr._id,
          },
        ],
        []
      );
      yield put(
        getDataScheduleSuccss(dataRes, data.total_page, data.total_item)
      );
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại ${error}`);
  }
}
export function* getDataSchedulesDetailIdSaga({ payload }) {
  const { id, params } = payload;
  try {
    const res = yield call(getDataScheduleStudentDetail, id, params);
    console.log(res);
    const { data } = res;
    if (data.success) {
      const dataRes = data.payload.days.reduce(
        (arr, curr) => [
          ...arr,
          {
            status: curr.status,
            date: curr.date,
            teacher: curr.teacher.fullname,
          },
        ],
        []
      );
      console.log(dataRes);
      yield put(
        getDataScheduleDetailIdSuccess(
          dataRes
          // data.total_page,
          // data.total_item
        )
      );
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại ${error}`);
  }
}
export function* getDataScheduleStudentSaga({ payload }) {
  const { params } = payload;
  try {
    const res = yield call(getDataScheduleStudent, params);
    console.log(res);
    const { data } = res;
    if (data.success) {
      const dataRes = data.payload[1].reduce(
        (arr, curr) => [
          ...arr,
          {
            days: curr.weekDays,
            id: curr._id,
            teacher: curr.teacher.fullname,
            subject: curr.subject.name,
            shift: curr.shift,
            startAt: curr.startAt,
            endAt: curr.endAt,
            season: curr.season.name,
          },
        ],
        []
      );
      yield put(getDataScheduleAllSuccess(dataRes));
    }
  } catch (error) {}
}
export function* getDataProfileStudentSaga() {
  try {
    const res = yield call(getDataProfileStudent);
    const { data } = res;
    if (data.success) {
      yield put(getDataProfileStudentSuccess(data.payload));
    }
  } catch (error) {}
}
