import axiosService from "../../../utility/axiosService/axiosService";
const url = "staff/student";
export const importExcelStudentApi = (data, params) => {
  return axiosService.postData(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}`,
    data,
    { params }
  );
};
