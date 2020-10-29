import { put, call } from "redux-saga/effects";
import { importExcelStudentApi } from "../../api/education/student";
import { getData } from "../../actions/dataListAssistance/index";
import { toastSuccess, toastWarning } from "../../../utility/toast/toastHelper";
export function* importExcelStudentEduSaga({ payload }) {
  const { file, params } = payload;
  console.log(params);
  let formData = new FormData();
  formData.append("excelFile", file);
  try {
    const res = yield call(importExcelStudentApi, formData);
    console.log(res);
    const { data } = res;
    if (data.success) {
      yield put(getData(params));
      toastSuccess("Import excel thành công");
    } else {
      toastWarning("Vui lòng thử lại sau !");
    }
  } catch (error) {
    toastWarning(`Đã có lỗi xảy ra :${error}`);
  }
}
