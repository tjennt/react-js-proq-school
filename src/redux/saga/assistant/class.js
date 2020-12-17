import { put, call } from "redux-saga/effects";
import {
  deleteDataAssClassApi,
  getDataAssClassApi,
  updateDataAssClassApi,
} from "../../api/assistant/class";
import {
  getDataClass,
  getDataClassSuccess,
} from "../../actions/dataListAssistance/index";
import { toastError, toastWarning } from "../../../utility/toast/toastHelper";
import { message } from "antd";
export function* getClassActionSaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataAssClassApi, param);
    const { data } = res;
    if (data.success === true) {
      yield put(
        getDataClassSuccess(data.payload, data.total_page, data.total_item)
      );
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại ${error}`);
  }
}
export function* updateDataClassSaga({ payload }) {
  const { obj, params } = payload;
  const dataReq = {
    name: obj.nameClass,
    specialization: obj.specializate,
    stage: obj.stage,
  };
  try {
    const res = yield call(updateDataAssClassApi, obj.id, dataReq);
    const { data } = res;
    if (data.success) {
      yield put(getDataClass(params));
      message.success("Cập nhật thành công ");
    }
  } catch (error) {
    toastError("Tên lớp đã tồn tại");
  }
}
export function* deleteDataClassSaga({ payload }) {
  const { id, params } = payload;
  try {
    const res = yield call(deleteDataAssClassApi, id);
    const { data } = res;
    if (data.success) {
      yield put(getDataClass(params));
      message.success("Xóa thành công!");
    }
  } catch (error) {}
}
