import axiosService from "../../utility/axiosService/axiosService";
const url = `staff/login`;
// const url = `web/admin/login`;
const urlGoogle = `users/web/google/login`;
export const loginJWt = (data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/${url}`,
    data
  );
};
export const loginWithGoogle = (data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/${urlGoogle}`,
    data
  );
};
