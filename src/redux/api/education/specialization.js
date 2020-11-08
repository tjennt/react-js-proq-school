import axiosService from "../../../utility/axiosService/axiosService";

const url = "staff/specialization";
export const addSpecializationApi = (data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}`,
    data
  );
};
