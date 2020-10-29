import axiosService from "../../utility/axiosService/axiosService";
import { API_ENDPOINT } from "../constants/index";
// import qs from "query-string";

const url = `web/admin/transaction`;
export const getDataTranc = ({ params }) => {
  return axiosService.get(`${API_ENDPOINT}/${url}`, { params });
};
export const trancSearch = (params) => {
  return axiosService.get(`${API_ENDPOINT}/${url}`, { params });
};
export const updateApprovedAccept = (id, data) => {
  return axiosService.put(`${API_ENDPOINT}/${url}/${id}/acceptApproved`, data);
};
export const updateAcceptDone = (id, data) => {
  return axiosService.put(`${API_ENDPOINT}/${url}/${id}/acceptDone`, data);
};
