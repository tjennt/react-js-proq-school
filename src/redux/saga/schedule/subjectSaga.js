import { call, put } from "redux-saga/effects";
import { getDataSceduleApi } from "../../api/schedule/semester";
import { getDataSubjectSuccess } from "../../actions/schedule/getDataSubject";
export function* getDataSubjectSaga({ payload }) {
  const { idClass, season } = payload;
  const params = {
    classID: idClass ? idClass : "",
    seasonID: season ? season : "",
  };
  try {
    const res = yield call(getDataSceduleApi, params);
    const { data } = res;
    if (data.success) {
      yield put(getDataSubjectSuccess(data.payload));
    }
  } catch (error) {}
}
