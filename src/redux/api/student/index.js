import axiosService from "../../../utility/axiosService/axiosService";
const url = "student/schedules";
export const getDataScheduleStudentId = (id, params) => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}/${id}`,
    {
      params,
    }
  );
};
export const getDataScheduleStudentDetail = (id, params) => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}/detail/${id}`,
    {
      params,
    }
  );
};
export const getDataScheduleStudent = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
export const getDataProfileStudent = () => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/student/profile`
  );
};
