import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
import { baseUrl } from "../../../utility/config";
import * as tranType from "../../constants/tranc";
import { toastSuccess } from "../../../utility/toast/toastHelper";
const baseUrlTest = `${baseUrl}/web/admin/transaction`;
export const getData = (params) => ({
  type: tranType.GET_DATA_TRANSACTION,
  payload: {
    params,
  },
});
export const getDataSuccess = (data, totalPages) => ({
  type: tranType.GET_DATA_TRANSACTION_SUCCESS,
  payload: {
    data,
    totalPages,
  },
});
export const getDataFaild = (error) => ({
  type: tranType.GET_DATA_TRANSACTION_FAILD,
  payload: {
    error,
  },
});
export const searchTrancSuccess = (data, totalPages) => ({
  type: tranType.TRANSACTION_SEARCH_SUCCESS,
  payload: {
    data,
    totalPages,
  },
});
export const getDataSearch = (search) => ({
  type: tranType.TRANSACTION_SEARCH,
  payload: {
    search: search,
  },
});
export const updateStatusAcceptApproved = (
  description,
  status,
  row,
  params
) => ({
  type: tranType.UPDATE_STATUS_TRANSACTION_APPROVED,
  payload: {
    description,
    status,
    row,
    params,
  },
});
export const updateStatusAcceptDone = (status, row, params) => ({
  type: tranType.UPDATE_TRANSACTION_DONE,
  payload: {
    status,
    row,
    params,
  },
});
