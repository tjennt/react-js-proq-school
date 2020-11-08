import { put, call } from "redux-saga/effects";
import { getDataStageSuccss } from "../../actions/dataListAssistance/index";
import { toastError, toastWarning } from "../../../utility/toast/toastHelper";
import { getDataAssStageApi } from "../../api/assistant/stage";
export function* getStageSaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataAssStageApi, param);
    const { data } = res;
    console.log(data);
    if (data.success === true) {
      yield put(
        getDataStageSuccss(data.payload, data.total_page, data.total_item)
      );
    } else {
      toastWarning("Vui lòng thử lại sau");
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại ${error}`);
  }
}
