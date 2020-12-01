import { put, call } from "redux-saga/effects";
import {
  getDataAssSubjectApi,
  updateDataSubjectApi,
} from "../../api/assistant/subject";
import { toastWarning } from "../../../utility/toast/toastHelper";
import {
  getDataSubject,
  getDataSubjectSuccess,
} from "../../actions/dataListAssistance/index";
import { message } from "antd";
export function* getSubjectActionSaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataAssSubjectApi, param);
    const { data } = res;
    if (data.success === true) {
      yield put(
        getDataSubjectSuccess(data.payload, data.total_page, data.total_item)
      );
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {}
}
export function* updateSubjectSaga({ payload }) {
  const { obj, params } = payload;
  const dataReq = {
    name: obj.nameSubject,
  };
  try {
    const res = yield call(updateDataSubjectApi, obj.id, dataReq);
    console.log(res);
    const { data } = res;
    if (data.success === true) {
      yield put(getDataSubject(params));
      message.success("Cập nhật thành công!!!!");
    }
  } catch (error) {}
}
