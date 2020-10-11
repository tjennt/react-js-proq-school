import { API_ENDPOINT } from "../../constants/index";
import axiosService from "../../../utility/axiosService/axiosService";
const url = "students";

export const getDataStudentApi = () => {
<<<<<<< HEAD
  return axiosService.get(
    `https://mockapi.io/projects/5f7ec86c094b670016b76782`
  );
=======
  return axiosService.get(`${API_ENDPOINT}/${url}`);
>>>>>>> 3dc3dba5c85002bdd577b4d310dfa30452660c81
};
