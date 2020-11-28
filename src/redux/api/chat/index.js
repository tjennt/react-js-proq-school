import axiosService from "../../../utility/axiosService/axiosService";
const url = "group";
export const joinFriendApi = (id) => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}/${id}`);
};
export const getMessageGroupByIdApi = (id) => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/message/${id}`
  );
};
export const sendChat = (id, data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/message/${id}`,
    data
  );
};
export const getAllGroupApi = () => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`);
};
export const searchUserApi = (params) => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/users/search`,
    {
      params,
    }
  );
};
