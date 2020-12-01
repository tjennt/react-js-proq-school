import { put, call } from "redux-saga/effects";
import {
  deleteDataUpdateApi,
  exportExcelStudentApi,
  getDataAssTeachers,
  updateDataTeacherApi,
} from "../../api/assistant/teacher";
import {
  getDataTeacher,
  getDataTeacherSuccess,
} from "../../actions/dataListAssistance/index";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../../utility/toast/toastHelper";
import { message } from "antd";
import * as moment from "moment";
export function* getTeacherActionSaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataAssTeachers, param);
    const { data } = res;
    if (data.success === true) {
      const dataRes = data.payload.reduce(
        (arr, curr) => [
          ...arr,
          {
            status: curr.status,
            _id: curr._id,
            teacherId: curr.teacherId,
            createdAt: curr.createdAt,
            email: curr.email,
          },
        ],
        []
      );
      yield put(
        getDataTeacherSuccess(dataRes, data.total_page, data.total_item)
      );
    } else {
      toastWarning("Vui lòng thử lại sau !");
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại sau ${error}`);
  }
}
export function* exportExcelTeacherSaga({ payload }) {
  const { nameFile } = payload;
  try {
    const res = yield call(exportExcelStudentApi);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    let name = nameFile || "Export ";
    link.setAttribute("download", `${name}.xlsx`);
    document.body.appendChild(link);
    link.click();
    message.success("Xuất excel thành công");
  } catch (error) {
    toastError(`Export không thành công vui lòng thử lại ! : ${error}`);
  }
}
export function* updateDataTeacherSaga({ payload }) {
  const { params, obj } = payload;
  const dataReq = {
    fullname: obj.fullname,
    phone: obj.phone,
    email: obj.email,
    specialization: obj.specialization,
    dob: moment(obj.dob).format("MM-DD-YYYY"),
    address: obj.address,
  };
  try {
     yield call(updateDataTeacherApi, obj.id, dataReq);
    yield put(getDataTeacher(params));
    toastSuccess("Cập nhật thành công !");
  } catch (error) {}
}
export function* deleteDataTeacherSaga({ payload }) {
  const { id, params } = payload;
  try {
     yield call(deleteDataUpdateApi, id);
    yield put(getDataTeacher(params));
    message.success("Xóa thành công !");
  } catch (error) {}
}
