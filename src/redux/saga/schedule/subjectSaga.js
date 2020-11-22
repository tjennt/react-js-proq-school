import { call, put } from "redux-saga/effects";
import {
  getDataSceduleApi,
  getDataSchedulesUpdate,
} from "../../api/schedule/semester";
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
export function* getDataSubjectUpdateSaga({ payload }) {
  const { id, idClass, season } = payload;
  console.log(payload);
  const params = {
    schedulesID: id ? id : "",
    classID: idClass ? idClass : "",
    seasonID: season ? season : "",
  };
  try {
    const res = yield call(getDataSchedulesUpdate, params);
    const { data } = res;
    if (data.success) {
      yield put(getDataSubjectSuccess(data.payload));
    }
  } catch (error) {}
}
