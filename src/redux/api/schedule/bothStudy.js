import axiosService from "../../../utility/axiosService/axiosService";
const url = "staff/schedules/getShift";
export const getDataBothStudyApi = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}/`, {
    params,
  });
};
