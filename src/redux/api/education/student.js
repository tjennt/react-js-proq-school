import axiosService from "../../../utility/axiosService/axiosService";
import { API_ENDPOINT } from "../../constants";
const url = "staff/student";
export const importExcelStudentApi = (data, params) => {
  return axiosService.postData(`${API_ENDPOINT}/${url}`, data, { params });
};
