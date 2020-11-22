import axiosService from "../../../utility/axiosService/axiosService";
const url = "staff/student";

export const getDataStudentApi = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
export const updateDataStudentApi = (id, data) => {
  return axiosService.put(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}/${id}`,
    data
  );
};
export const deleteDataStudentApi = (id) => {
  return axiosService.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}/${id}`
  );
};
export const exportExcelStudentApi = (id) => {
  return axiosService.getExportExcel(
    `${process.env.REACT_APP_API_ENDPOINT}/staff/export/student/${id}`
  );
};
