import axiosService from "../../../utility/axiosService/axiosService";
import { API_ENDPOINT } from "../../constants/index";

const url = `subject`;

export const getDataAssSubjectApi = () => {
  return axiosService.get(`${API_ENDPOINT}/${url}`);
};
