import axiosService from "../../../utility/axiosService/axiosService";
import { API_ENDPOINT } from "../../constants/index";

const url = `schedules`;

export const getDataAssClassApi = () => {
  return axiosService.get(`${API_ENDPOINT}/${url}`);
};
