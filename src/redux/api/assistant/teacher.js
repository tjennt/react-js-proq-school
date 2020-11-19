import axiosService from "../../../utility/axiosService/axiosService";
const url = `staff/teacher`;
export const getDataAssTeachers = (params) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`, {
    params,
  });
};
export const exportExcelStudentApi = () => {
  return axiosService.getExportExcel(
    `${process.env.REACT_APP_API_ENDPOINT}/staff/export/teacher`
  );
};
