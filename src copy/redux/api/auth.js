import axiosService from "../../utility/axiosService/axiosService";
import { API_ENDPOINT } from "../constants/index";
const url = `web/admin/login`;
export const loginJWt = (data) => {
  return axiosService.post(`http://122.248.226.220/${url}`, data);
};
