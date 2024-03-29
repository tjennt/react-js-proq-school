import axiosService from "../../../utility/axiosService/axiosService";

const url = "staff/class";
export const addClassApi = (data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}`,
    data
  );
};
