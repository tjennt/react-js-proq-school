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
    history.push("/");
    // const res = yield call(loginJWt, authData);
    // const { data } = res;
    // console.log(data);
    // if (data.success === true) {
    //   setUserCookie(data.payload.token);
    // yield put(changeRole(data.payload.role.name));
    yield put(changeRole("admin"));
    //   // history.push("/");
    //   switch (data.payload.role.name) {
    //     case "admin":
    //       break;
    //     default:
    //       return false;
    //   }
    //   toastSuccess(`Xin chào ${data.payload.role.name} ...`);
    // }
  } catch (error) {
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
    const { data } = res;
    if (data.success === true) {
      setUserCookie(data.payload.token);
      yield put(changeRole(data.payload.access));
      switch (data.payload.access) {
        case "student":
          history.push("/student/news");
          break;
        default:
          return false;
      }
      toastSuccess(`Xin chào ${data.payload.access} ...`);
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
