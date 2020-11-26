import axiosService from "../../../utility/axiosService/axiosService";
const url = "teacher/schedulesClass";

const urlTeacher = "teacher/schedules";
export const getDataTeacherApi = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
export const getSchedulesAllApi = (params) => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/${urlTeacher}`,
    {
      params,
    }
  );
};
export const getDataTeacherDetailApi = (id, params) => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/${urlTeacher}/${id}`,
    {
      params,
    }
  );
};
export const scheduleApi = (data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/${urlTeacher}`,
    data
  );
};
export const getDataProfileTeacherApi = () => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/teacher/profile`
  );
};
