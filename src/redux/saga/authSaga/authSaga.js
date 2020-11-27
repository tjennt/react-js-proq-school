import { put, call, delay } from "redux-saga/effects";
import { loginJWt, loginWithGoogle } from "../../api/auth";
import { setUserCookie } from "../../../utility/auth/setAuthToken";
import { changeRole, loginSuccess } from "../../actions/auth/loginActions";
import { history } from "../../../history";
import { toastSuccess, toastError } from "../../../utility/toast/toastHelper";
import { hideLoading } from "../../actions/ui";
export function* loginActionSaga({ payload }) {
  const { user } = payload;
  const authData = {
    username: user.email,
    password: user.password,
  };
  try {
    // history.push("/");
    const res = yield call(loginJWt, authData);
    const { data } = res;
    yield delay(500);
    if (data.success === true) {
      setUserCookie(data.payload.token);
      yield put(loginSuccess(data.payload));
      yield put(hideLoading());
      yield put(changeRole(data.payload.role.name));
      switch (data.payload.role.name) {
        case "admin":
          history.push("/");
          break;
        default:
          return false;
      }
      toastSuccess(`Xin chào ${data.payload.role.name} ...`);
    }
  } catch (error) {
    yield put(changeRole(""));
    yield put(hideLoading());
    toastError("Tài khoản hoặc mật khẩu không đúng!");
  }
}
export function* loginWithGoogleSaga({ payload }) {
  const { user } = payload;
  const authData = {
    tokenId: user,
  };
  try {
    const res = yield call(loginWithGoogle, authData);
    yield delay(500);
    const { data } = res;
    if (data.success === true) {
      yield put(loginSuccess(data.payload));
      setUserCookie(data.payload.token);
      yield put(hideLoading());
      yield put(changeRole(data.payload.access));

      switch (data.payload.access) {
        case "student":
          history.push("/student/news");
          localStorage.setItem("role", data.payload.access);
          break;
        case "teacher":
          history.push("/");
          break;
        default:
          return false;
      }
      toastSuccess(`Xin chào ${data.payload.access} ...`);
    }
  } catch (error) {
    yield put(changeRole(""));
    yield put(hideLoading());
    toastError("Tài khoản hoặc mật khẩu không đúng!");
  }
}
export function* logoutSaga() {
  yield put(changeRole(""));
  localStorage.removeItem("role");
  history.push("/login");
}
