import axiosService from "../../../utility/axiosService/axiosService";
const url = `staff/subject`;
export const getDataAssSubjectApi = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
