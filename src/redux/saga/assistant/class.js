import { put, call } from "redux-saga/effects";
import { getDataAssClassApi } from "../../api/assistant/class";
import { getDataClassSuccess } from "../../actions/dataListAssistance/index";
import { toastError, toastWarning } from "../../../utility/toast/toastHelper";
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
