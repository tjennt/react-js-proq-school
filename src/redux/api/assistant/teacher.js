import axiosService from "../../../utility/axiosService/axiosService";
const url = `staff/teacher`;
export const getDataAssTeachers = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
export const updateDataTeacherApi = (id, data) => {
  return axiosService.put(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}/${id}`,
    data
  );
};
export const deleteDataUpdateApi = (id) => {
  return axiosService.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}/${id}`
  );
};
export const exportExcelStudentApi = () => {
  return axiosService.getExportExcel(
    `${process.env.REACT_APP_API_ENDPOINT}/staff/export/teacher`
  );
};
