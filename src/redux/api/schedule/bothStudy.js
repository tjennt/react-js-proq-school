import axiosService from "../../../utility/axiosService/axiosService";
const url = "";
export const getDataBothStudyApi = () => {
  return axiosService.post(`${process.env.REACT_APP_API_ENDPOINT}/${url}`);
};
