import axiosService from "../../../utility/axiosService/axiosService";
const url = "staff/subject";
export const addSubject = (data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}`,
    data
  );
};
