import axiosService from "../../../utility/axiosService/axiosService";
const url = `staff/stage`;

export const getDataAssStageApi = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
