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
