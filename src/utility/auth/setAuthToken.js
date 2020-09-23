import Cookies from "js-cookie";
import axios from "axios";
// return the token from the session storage
export const getToken = () => {
  return Cookies.get("token") || null;
};
export const removeUserCookie = () => {
  Cookies.remove("token");
};
// set the token and user from the cookie storage
export const setUserCookie = (token) => {
  Cookies.set("token", token, { expires: 7 });
  // sessionStorage.setItem('user', JSON.stringify(user));
};
export const setUserRoleLocal = (role) => {
  localStorage.setItem("userRole", role);
};
export const getUserRoleLocal = () => {
  localStorage.getItem("userRole");
};
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
};
export default setAuthToken;
