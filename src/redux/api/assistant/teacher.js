import axiosService from "../../../utility/axiosService/axiosService";
import { API_ENDPOINT } from "../../constants/index";

const url = `teacher`;

export const getDataAssTeachers = () => {
  return axiosService.get(`${API_ENDPOINT}/${url}`);
};
