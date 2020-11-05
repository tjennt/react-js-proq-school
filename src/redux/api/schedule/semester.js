import axiosService from "../../../utility/axiosService/axiosService";
const url = "";
export const getDataSceduleApi = () => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`);
};
