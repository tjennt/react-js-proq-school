import { put, call } from "redux-saga/effects";
import {
  exportExcelStudentApi,
  getDataAssTeachers,
} from "../../api/assistant/teacher";
import { getDataTeacherSuccess } from "../../actions/dataListAssistance/index";
import { toastError, toastWarning } from "../../../utility/toast/toastHelper";
import { message } from "antd";
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
      yield put(
        getDataTeacherSuccess(data.payload, data.total_page, data.total_item)
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
