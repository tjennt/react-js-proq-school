import { put, call } from "redux-saga/effects";
// import { toastSuccess, toastError } from "../../../utility/toast/toastHelper";
import { getDataStudentApi } from "../../api/assistant/student";
import { getDataSuccess } from "../../actions/dataListAssistance/index";
export function* getStudentActionSaga({ payload }) {
  const { params } = payload;
  console.log(params);
  const param = {
    page: params.page,
    limit: params.limit,
  };
  console.log(param);
  try {
    const res = yield call(getDataStudentApi, param);
    const { data } = res;
    console.log(data.payload);
    yield put(getDataSuccess(data.payload, data.total_page, data.total_item));
  } catch (error) {}
}
