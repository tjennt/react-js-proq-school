import { put, call } from "redux-saga/effects";
import { getDataAssSubjectApi } from "../../api/assistant/subject";
import { getDataSubjectSuccess } from "../../actions/dataListAssistance/index";
export function* getSubjectActionSaga({ payload }) {
  try {
    const res = yield call(getDataAssSubjectApi);
    const { data } = res;
    console.log(data.payload);
    yield put(getDataSubjectSuccess(data.payload));
  } catch (error) {}
}
