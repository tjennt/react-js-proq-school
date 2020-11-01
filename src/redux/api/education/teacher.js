import axiosService from "../../../utility/axiosService/axiosService";
import { API_ENDPOINT } from "../../constants";
const url = "staff/teacher";
export const importExcelTeacherApi = (data, params) => {
  return axiosService.postData(`${API_ENDPOINT}/${url}`, data, { params });
};
