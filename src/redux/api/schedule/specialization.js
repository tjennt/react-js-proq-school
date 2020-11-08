import axiosService from "../../../utility/axiosService/axiosService";
const url = "staff/specialization";
export const getDataSpecializationApi = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
