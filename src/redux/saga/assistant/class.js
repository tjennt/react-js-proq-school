import { put, call } from "redux-saga/effects";
import { getDataAssClassApi } from "../../api/assistant/class";
import { getDataClassSuccess } from "../../actions/dataListAssistance/index";
export function* getClassActionSaga({ payload }) {
  const { params } = payload;

  const param = {
    page: params.page,
    limit: params.limit,
  };
  try {
    const res = yield call(getDataAssClassApi, param);
    const { data } = res;
    yield put(
      getDataClassSuccess(data.payload, data.total_page, data.total_item)
    );
  } catch (error) {}
}
