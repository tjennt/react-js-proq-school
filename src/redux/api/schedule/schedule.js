import axiosService from "../../../utility/axiosService/axiosService";
const url = "staff/schedules";
export const addSchedulesApi = (data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}/`,
    data
  );
};
