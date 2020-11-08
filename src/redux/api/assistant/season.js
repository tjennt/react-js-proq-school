import axiosService from "../../../utility/axiosService/axiosService";
const url = `staff/season`;

export const getDataAssSeasonApi = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
