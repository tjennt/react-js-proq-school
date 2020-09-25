import { put, call } from "redux-saga/effects";
import { getDataAssClassApi } from "../../api/assistant/class";
import { getDataClassSuccess } from "../../actions/dataListAssistance/index";
export function* getClassActionSaga({ payload }) {
  try {
    const res = yield call(getDataAssClassApi);
    const { data } = res;
    console.log(data.payload);
    yield put(getDataClassSuccess(data.payload));
  } catch (error) {}
}
