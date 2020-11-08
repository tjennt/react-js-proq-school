import { put, call } from "redux-saga/effects";
import { toastError, toastWarning } from "../../../utility/toast/toastHelper";
import { getDataSpecializationApi } from "../../api/schedule/specialization";
import { getDataSpecializationSuccess } from "../../actions/schedule/getDataSpecialization";
export function* getSpecializationSaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataSpecializationApi, param);
    const { data } = res;
    console.log(data);
    if (data.success === true) {
      console.log("abc");
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
