import { put, call } from "redux-saga/effects";
import { importExcelStudentApi } from "../../api/education/student";
import {
  getData,
  getDataTeacher,
} from "../../actions/dataListAssistance/index";
import { toastSuccess, toastWarning } from "../../../utility/toast/toastHelper";
import { importExcelTeacherApi } from "../../api/education/teacher";
export function* importExcelStudentEduSaga({ payload }) {
  const { file, params } = payload;
  console.log(params);
  let formData = new FormData();
  formData.append("excelFile", file);
  try {
    const res = yield call(importExcelStudentApi, formData);
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
/**
 * teacher
 */
export function* importExcelTeacherEduSaga({ payload }) {
  const { file, params } = payload;
  console.log(params, file);
  let formData = new FormData();
  formData.append("excelFile", file);
  try {
    const res = yield call(importExcelTeacherApi, formData);
    console.log(res);
    const { data } = res;
    if (data.success) {
      yield put(getDataTeacher(params));
      toastSuccess("Import excel thành công");
    } else {
      toastWarning("Vui lòng thử lại sau !");
    }
  } catch (error) {
    toastWarning(`Đã có lỗi xảy ra :${error}`);
  }
}
/**
 * class
 */
export function* addClassSaga({ payload }) {
  const { obj, params } = payload;
  yield console.log(payload);
}
/**
 * subject
 */
export function* addSubjectSaga({ payload }) {
  const { obj, params } = payload;
  yield console.log(payload);
}
