import { put, call } from "redux-saga/effects";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../../utility/toast/toastHelper";
import {
  getDataSpecializationApi,
  updateDataSpecialApi,
} from "../../api/schedule/specialization";
import {
  getDataSpecialization,
  getDataSpecializationSuccess,
} from "../../actions/schedule/getDataSpecialization";
export function* getSpecializationSaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataSpecializationApi, param);
    const { data } = res;
    if (data.success === true) {
      yield put(
        getDataSpecializationSuccess(
          data.payload,
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
export function* updateDataSpecialSaga({ payload }) {
  const { obj, params } = payload;
  const dataReq = {
    name: obj.nameSpecialization,
    subject: obj.subject,
  };
  try {
    const res = yield call(updateDataSpecialApi, obj.id, dataReq);
    const { data } = res;
    if (data.success) {
      yield put(getDataSpecialization(params));
      toastSuccess("Thêm dữ liệu thành công");
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại sau ${error}`);
  }
}
