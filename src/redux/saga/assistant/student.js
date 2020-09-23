import { put, call } from "redux-saga/effects";
// import { toastSuccess, toastError } from "../../../utility/toast/toastHelper";
import { getDataStudentApi } from "../../api/assistant/student";
import { getDataSuccess } from "../../actions/dataListAssistance/index";
export function* getStudentActionSaga({ payload }) {
  try {
    const res = yield call(getDataStudentApi);
    const { data } = res;
    console.log(data.payload);
    yield put(getDataSuccess(data.payload));
  } catch (error) {}
}
