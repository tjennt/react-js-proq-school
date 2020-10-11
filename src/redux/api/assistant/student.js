import { API_ENDPOINT1 } from "../../constants/index";
import axiosService from "../../../utility/axiosService/axiosService";
const url = "students";

export const getDataStudentApi = () => {
  return axiosService.get(
    `https://mockapi.io/projects/5f7ec86c094b670016b76782`
  );
};
