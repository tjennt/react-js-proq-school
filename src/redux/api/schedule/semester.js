import axiosService from "../../../utility/axiosService/axiosService";
const url = "staff/schedules";
export const getDataSceduleApi = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
export const getDataSchedulesUpdate = (params) => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/staff/schedulesUpdate`,
    { params }
  );
};
