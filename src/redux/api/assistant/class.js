import axiosService from "../../../utility/axiosService/axiosService";
const url = `staff/class`;

export const getDataAssClassApi = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
export const updateDataAssClassApi = (id, data) => {
  return axiosService.put(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}/${id}`,
    data
  );
};
export const deleteDataAssClassApi = (id) => {
  return axiosService.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}/${id}`
  );
};
