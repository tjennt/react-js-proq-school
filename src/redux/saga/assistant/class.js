import { put, call } from "redux-saga/effects";
import { getDataAssClassApi } from "../../api/assistant/class";
import { getDataClassSuccess } from "../../actions/dataListAssistance/index";
export function* getClassActionSaga({ payload }) {
  const { params } = payload;

  // const param = {
  //   page: params ? params.page : "",
  //   limit: params ? params.limit : "",
  // };
  try {
    const res = yield call(getDataAssClassApi);
    const { data } = res;
    yield put(
      getDataClassSuccess(res.data.data.data, data.total_page, data.total_item)
    );
  } catch (error) {}
}
