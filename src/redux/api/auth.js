import axiosService from "../../utility/axiosService/axiosService";
import { API_ENDPOINT } from "../constants/index";
const url = `staff/login`;
// const url = `web/admin/login`;
const urlGoogle = `users/web/google/login`;
export const loginJWt = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${url}`, data);
};
export const loginWithGoogle = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${urlGoogle}`, data);
};
