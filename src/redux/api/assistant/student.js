import { API_ENDPOINT } from "../../constants/index";
import axiosService from "../../../utility/axiosService/axiosService";
const url = "students";

export const getDataStudentApi = () => {
  return axiosService.get(`${API_ENDPOINT}/${url}`);
};
