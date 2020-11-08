import { put, call } from "redux-saga/effects";
import { getDataSeasonSuccss } from "../../actions/dataListAssistance/index";
import { toastError, toastWarning } from "../../../utility/toast/toastHelper";
import { getDataAssSeasonApi } from "../../api/assistant/season";
export function* getSeasonSaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataAssSeasonApi, param);
    const { data } = res;
    console.log(data);
    if (data.success === true) {
      console.log("abc");
      yield put(
        getDataSeasonSuccss(data.payload, data.total_page, data.total_item)
      );
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại ${error}`);
  }
}
