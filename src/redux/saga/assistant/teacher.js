import { put, call } from "redux-saga/effects";
import { getDataAssTeachers } from "../../api/assistant/teacher";
import { getDataTeacherSuccess } from "../../actions/dataListAssistance/index";
import { toastError, toastWarning } from "../../../utility/toast/toastHelper";
export function* getTeacherActionSaga({ payload }) {
  const { params } = payload;
  const param = {
    page: params ? params.page : "",
    limit: params ? params.limit : "",
  };
  try {
    const res = yield call(getDataAssTeachers, param);
    const { data } = res;
    if (data.success === true) {
      yield put(
        getDataTeacherSuccess(data.payload, data.total_page, data.total_item)
      );
    } else {
      toastWarning("Vui lòng thử lại sau !");
    }
  } catch (error) {
    toastError(`Đã có lỗi xảy ra vui lòng thử lại sau ${error}`);
  }
}
