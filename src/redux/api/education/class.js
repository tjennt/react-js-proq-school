import axiosService from "../../../utility/axiosService/axiosService";

const url = "";
export const addClass = (data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}`,
    data
  );
};
