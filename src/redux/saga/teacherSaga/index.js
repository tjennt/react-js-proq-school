import { put, call } from "redux-saga/effects";
import { toastWarning, toastError } from "../../../utility/toast/toastHelper";
import {
  getDataSchedulesTeacherIdSuccess,
  getDataSchedulesTeacherSuccess,
} from "../../actions/teacher";
import {
  getDataTeacherApi,
  getDataTeacherDetailApi,
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
    console.log(data);
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
  console.log(payload);
  try {
    const res = yield call(getDataTeacherDetailApi, id, params);
    const { data } = res;
    console.log(data);
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
  const { data, id } = payload;

  let date = moment(data.date).format("MM/DD/YYYY");
  console.log(date);
  const dataReq = {
    schedulesClass: id,
    status: !data.status,
    student: data.idStudent,
    date: date,
  };
  console.log(data.fullName);
  try {
    const res = yield call(scheduleApi, dataReq);
    console.log(res);
    const { data: dataRes } = res;
    if (dataRes.success) {
      message.success(` Sinh viên ${data.fullName} đã được điểm danh  `);
    } else {
      toastWarning("Điểm danh thất bại !");
    }
  } catch (error) {}
}
