import axiosService from "../../../utility/axiosService/axiosService";
const url = `staff/schedules`;

export const getDataSchedulesApi = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
