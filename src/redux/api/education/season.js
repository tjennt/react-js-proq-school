import axiosService from "../../../utility/axiosService/axiosService";
const url = "staff/season";
export const addSeasonApi = (data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}`,
    data
  );
};
