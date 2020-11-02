import axiosService from "../../../utility/axiosService/axiosService";
const url = `staff/class`;

export const getDataAssClassApi = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
