import axiosService from "../../../utility/axiosService/axiosService";
const url = "staff/stage";
export const addStageApi = (data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}`,
    data
  );
};
