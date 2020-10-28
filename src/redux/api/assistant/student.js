import { API_ENDPOINT } from "../../constants/index";
import axiosService from "../../../utility/axiosService/axiosService";
const url = "staff/student";

export const getDataStudentApi = (params) => {
  return axiosService.get(`${API_ENDPOINT}/${url}`, { params });
};
