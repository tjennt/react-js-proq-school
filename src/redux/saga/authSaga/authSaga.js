import { put, call } from "redux-saga/effects";
import { loginJWt } from "../../api/auth";
import { STATUS_CODE } from "../../constants";
import { setUserCookie } from "../../../utility/auth/setAuthToken";
import {
  loginSuccess,
  changeRole,
  logoutSuccess,
} from "../../actions/auth/loginActions";
import { history } from "../../../history";
import { toastSuccess, toastError } from "../../../utility/toast/toastHelper";
export function* loginActionSaga({ payload }) {
  const { user } = payload;
  const authData = {
    email: user.email,
    password: user.password,
  };
  try {
    const res = yield call(loginJWt, authData);
    const { status: statusCode, data } = res;
    if (statusCode === STATUS_CODE.SUCCESS) {
      yield put(loginSuccess(data.data));
      setUserCookie(data.data.token);
      yield put(changeRole(data.data.role));
      history.push("/");
      toastSuccess(`Xin chào ${data.data.role}...`);
    }
  } catch (error) {
    toastError("Tài khoản hoặc mật khẩu không đúng!");
  }
}
export function* logoutSaga() {
  yield put(logoutSuccess());
  yield put(changeRole(""));
  history.push("/login");
}
