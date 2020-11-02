import axiosService from "../../../utility/axiosService/axiosService";
const url = "staff/student";

export const getDataStudentApi = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
