import axiosService from "../../../utility/axiosService/axiosService";
const url = `subject`;
export const getDataAssSubjectApi = () => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`);
};
