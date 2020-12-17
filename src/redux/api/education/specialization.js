import axiosService from "../../../utility/axiosService/axiosService";

const url = "staff/specialization";
export const addSpecializationApi = (data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}`,
    data
  );
};
export const updateSpecializationApi = (id, data) => {
  return axiosService.put(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}/${id}`,
    data
  );
};
export const deleteSpecializationApi = (id) => {
  return axiosService.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}/${id}`
  );
};
