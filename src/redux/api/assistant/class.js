import axiosService from "../../../utility/axiosService/axiosService";
import { API_ENDPOINT } from "../../constants/index";
const url = `web/admin/user`;

export const getDataAssClassApi = (params) => {
  return axiosService.get(`${API_ENDPOINT}/${url}`, { params });
};
