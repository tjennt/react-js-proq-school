import { put, call } from "redux-saga/effects";
import { toastWarning, toastError } from "../../../utility/toast/toastHelper";
import {
  getDataSchedulesTeacherId,
  getDataSchedulesTeacherIdSuccess,
  getDataSchedulesTeacherSuccess,
  getProfileTeacherSuccess,
  getSchedulesAllSuccess,
} from "../../actions/teacher";
import {
  getDataProfileTeacherApi,
  getDataTeacherApi,
  getDataTeacherDetailApi,
  getSchedulesAllApi,
  scheduleApi,
} from "../../api/teacher/index";
import moment from "moment";
import { message } from "antd";
/**
 * getScheduleTeacher
 */
export function* getSchedulesTeacgerSaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataTeacherApi, param);
    const { data } = res;
    if (data.success === true) {
      let dataSchedule = data.payload.reduce(
        (arr, curr) => [
          ...arr,
          {
            class: curr.class.name,
            season: curr.season.name,
            shift: curr.shift,
            weekDays: curr.weekDays,
            id: curr._id,
            subject: curr.subject.name,
            createdAt: curr.createAt,
            startAt: curr.startAt,
          },
        ],
        []
      );
      yield put(
        getDataSchedulesTeacherSuccess(
          dataSchedule,
          data.total_page,
          data.total_item
        )
      );
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại ${error}`);
  }
}
export function* getTeacherDetailSaga({ payload }) {
  const { params, id } = payload;
  try {
    const res = yield call(getDataTeacherDetailApi, id, params);
    const { data } = res;
    let dataDetail = data.payload.reduce(
      (arr, curr) => [
        ...arr,
        {
          fullName: curr.student.fullName,
          avatar: curr.student.avatar,
          idStudent: curr.student._id,
          status: curr.status,
          date: curr.date,
          class: curr.class,
          subject: curr.subject,
        },
      ],
      []
    );
    if (data.success) {
      yield put(getDataSchedulesTeacherIdSuccess(dataDetail));
    }
  } catch (error) {}
}
export function* scheduleSaga({ payload }) {
  const { data, id, params } = payload;
  let date = moment(data.date).format("MM-DD-YYYY");
  const dataReq = {
    schedulesClass: id,
    status: !data.status,
    student: data.idStudent,
    date: date,
  };
  try {
    const res = yield call(scheduleApi, dataReq);
    const { data: dataRes } = res;
    if (dataRes.success) {
      if (dataRes.payload.status) {
        yield put(getDataSchedulesTeacherId(params, id));
        message.success(` Sinh viên ${data.fullName} đã được điểm danh  `);
      } else {
        yield put(getDataSchedulesTeacherId(params, id));
        message.error(` Hủy điểm danh sinh viên ${data.fullName}!`);
      }
    } else {
      toastWarning("Điểm danh thất bại !");
    }
  } catch (error) {}
}
export function* getProfileTeacherSaga() {
  try {
    const res = yield call(getDataProfileTeacherApi);
    const { data } = res;
    if (data.success) {
      yield put(getProfileTeacherSuccess(data.payload));
    }
  } catch (error) {}
}
export function* getDataSchedulesAllSaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getSchedulesAllApi, param);
    const { data } = res;
    if (data.success) {
      const dataRes = data.payload.reduce(
        (arr, curr) => [
          ...arr,
          {
            class: curr.class.name,
            season: curr.season.name,
            shift: curr.shift,
            subject: curr.subject.name,
            startAt: curr.startAt,
            endAt: curr.endAt,
            weeksDay: curr.weekDays,
            id: curr._id,
          },
        ],
        []
      );
      yield put(
        getSchedulesAllSuccess(dataRes, data.total_page, data.total_item)
      );
    }
  } catch (error) {}
}
