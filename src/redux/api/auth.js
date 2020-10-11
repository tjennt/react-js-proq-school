import axiosService from "../../utility/axiosService/axiosService";
import { API_ENDPOINT1 } from "../constants/index";
const url = `web/admin/login`;
export const loginJWt = (data) => {
  return axiosService.post(`${API_ENDPOINT1}/${url}`, data);
};
