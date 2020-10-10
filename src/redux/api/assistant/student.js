import { API_ENDPOINT1 } from "../../constants/index";
import axiosService from "../../../utility/axiosService/axiosService";
const url = "students";

export const getDataStudentApi = () => {
  return axiosService.get(
    `https://mockapi.io/clone/5f817fec5b1f3f00161a6a92/student`
  );
};
