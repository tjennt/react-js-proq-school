import axiosService from "../../../utility/axiosService/axiosService";
import { API_ENDPOINT } from "../../constants/index";
const url = `staff/teacher`;

export const getDataAssTeachers = (params) => {
  return axiosService.get(`${API_ENDPOINT}/${url}`, { params });
};
