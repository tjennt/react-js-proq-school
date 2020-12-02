import { put, call } from "redux-saga/effects";
// import { toastSuccess, toastError } from "../../../utility/toast/toastHelper";
import {
  deleteDataStudentApi,
  exportExcelStudentApi,
  getDataStudentApi,
  updateDataStudentApi,
} from "../../api/assistant/student";
import {
  getData,
  getDataSuccess,
} from "../../actions/dataListAssistance/index";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../../utility/toast/toastHelper";
import { message } from "antd";
export function* getStudentActionSaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataStudentApi, param);
    const { data } = res;
    if (data.success === true) {
      yield put(getDataSuccess(data.payload, data.total_page, data.total_item));
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại ${error}`);
  }
}
export function* exportExcelStudentSaga({ payload }) {
  const { classArr, nameFile } = payload;
  const id = classArr ? classArr.value : "";
  try {
    const res = yield call(exportExcelStudentApi, id);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    let name = nameFile || "Export ";
    link.setAttribute("download", `${name}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    toastError(`Export không thành công vui lòng thử lại ! : ${error}`);
  }
}

export function* updateDataStudentSaga({ payload }) {
  const { params, obj } = payload;
  const dataReq = {
    fullName: obj.fullname,
    phone: obj.phone,
    email: obj.email,
    identityNumber: obj.identityNumber,
    dob: obj.dob,
    address: obj.address,
  };
  try {
    yield call(updateDataStudentApi, obj.id, dataReq);
    yield put(getData(params));
    toastSuccess("Cập nhật thành công !");
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại !!! ${error}`);
  }
}
export function* deleteDataStudentSaga({ payload }) {
  const { id, params } = payload;
  try {
     yield call(deleteDataStudentApi, id);
    yield put(getData(params));
    message.success("Xóa thành công !");
  } catch (error) {}
}
