import { put, call } from "redux-saga/effects";
import { getDataAssSubjectApi } from "../../api/assistant/subject";
import { toastWarning } from "../../../utility/toast/toastHelper";
import { getDataSubjectSuccess } from "../../actions/dataListAssistance/index";
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
