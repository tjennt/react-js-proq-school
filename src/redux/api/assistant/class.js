import axiosService from "../../../utility/axiosService/axiosService";
import { API_ENDPOINT } from "../../constants/index";
const url = `staff/class`;

export const getDataAssClassApi = (params) => {
  return axiosService.get(`${API_ENDPOINT}/${url}`, { params });
};
