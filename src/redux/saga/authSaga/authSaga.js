import { put, call } from "redux-saga/effects";
import { loginJWt, loginWithGoogle } from "../../api/auth";
import { setUserCookie } from "../../../utility/auth/setAuthToken";
import { changeRole, logoutSuccess } from "../../actions/auth/loginActions";
import { history } from "../../../history";
import { toastSuccess, toastError } from "../../../utility/toast/toastHelper";
export function* loginActionSaga({ payload }) {
  const { user } = payload;
  const authData = {
    username: user.email,
    password: user.password,
  };
  try {
    const res = yield call(loginJWt, authData);
    const { data } = res;
    console.log(data);
    if (data.success === true) {
      setUserCookie(data.payload.token);
      yield put(changeRole(data.payload.role.name));
      // history.push("/");
      switch (data.payload.role.name) {
        case "admin":
          history.push("/assistTant");
          break;
        default:
          return false;
      }
      toastSuccess(`Xin chào ${data.payload.role.name} ...`);
    }
  } catch (error) {
    toastError("Tài khoản hoặc mật khẩu không đúng!");
  }
}
export function* loginWithGoogleSaga({ payload }) {
  const { user } = payload;
  console.log(user);
  const authData = {
    tokenId: user,
  };
  try {
    const res = yield call(loginWithGoogle, authData);
    console.log(res);
    const { data } = res;
    console.log(data);
    if (data.success === true) {
      setUserCookie(data.payload.token);
      yield put(changeRole(data.payload.role.name));
      // history.push("/");
      switch (data.payload.role.name) {
        case "admin":
          history.push("/assistTant");
          break;
        default:
          return false;
      }
      toastSuccess(`Xin chào ${data.payload.role.name} ...`);
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
