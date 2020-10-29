import * as authType from "../../constants/auth";
export const loginWithJWT = (user) => ({
  type: authType.LOGIN,
  payload: {
    user,
  },
});
export const loginWithGoogle = (user) => ({
  type: authType.LOGIN_GOOGLE,
  payload: {
    user,
  },
});
export const loginSuccess = (loggedInUser) => ({
  type: authType.LOGIN_SUCCESS,
  payload: {
    loggedInUser,
  },
});
export const loginFaild = (error) => ({
  type: authType.LOGIN_FAILD,
  payload: {
    error,
  },
});
export const logoutWithJWT = () => ({
  type: authType.LOGOUT,
});
export const logoutSuccess = () => ({
  type: authType.LOGOUT_SUCCESS,
  payload: {},
});
export const changeRole = (userRole) => {
  return (dispatch) => dispatch({ type: "CHANGE_ROLE", userRole: userRole });
};
