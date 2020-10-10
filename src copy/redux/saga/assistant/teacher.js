import { put, call } from "redux-saga/effects";
import { getDataAssTeachers } from "../../api/assistant/teacher";
import { getDataTeacherSuccess } from "../../actions/dataListAssistance/index";
export function* getTeacherActionSaga({ payload }) {
  try {
    const res = yield call(getDataAssTeachers);
    const { data } = res;
    console.log(data.payload);
    yield put(getDataTeacherSuccess(data.payload));
  } catch (error) {}
}
