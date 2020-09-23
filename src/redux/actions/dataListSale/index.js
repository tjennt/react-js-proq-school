import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
import { baseUrl } from "../../../utility/config";
import * as saleTypes from "./../../types/salesTypes";
import { toastWarning, toastSuccess } from "../../../utility/toast/toastHelper";
const baseUrlTest = `${baseUrl}/web/admin/order`;
export const getData = (params) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    const res = await axios.get(baseUrlTest, {
      params,
    });
    dispatch({
      type: saleTypes.GET_DATA_SALE,
      data: res.data.data.data,
      totalPages: res.data.data.total_page,
      params,
    });
  } catch (error) {}
};
export const getDataSearch = (search) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    const res = await axios.get(`${baseUrlTest}`, {
      params: {
        search: search,
      },
    });
    dispatch({
      type: saleTypes.GET_DATA_SALE,
      data: res.data.data.data,
      totalPages: res.data.data.total_page,
      search,
    });
  } catch (error) {}
};
export const upDateDone = (row, params) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    await axios.put(`${baseUrl}/web/admin/order/${row.order_id}/accept`);
    toastSuccess("Đơn hàng đã hoàn tất ");
    dispatch(getData(params));
  } catch (error) {
    toastWarning("Đơn hàng chưa được xác nhận ");
  }
};
