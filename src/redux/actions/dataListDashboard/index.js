import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
import { baseUrl } from "../../../utility/config";
const baseUrlTotalProduct = `${baseUrl}/web/admin/dashboard/billing`;
const baseUrlToTalMoney = `${baseUrl}/web/admin/dashboard/revenue`;
const baseUrlTotalUser = `${baseUrl}/web/admin/dashboard/user`;
const baseUrlDashboard = `${baseUrl}/web/admin/dashboard`;
const baseUrlTotalUserLogin = `${baseUrl}/web/admin/dashboard/user/pieChart`;
export const getDataDashboard = (dateStart, dateEnd) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    const res = await axios.get(`${baseUrlDashboard}`, {
      params: {
        start_time: dateStart,
        end_time: dateEnd,
      },
    });
    dispatch({
      type: "GET_DATA_TOTAL_DASHBOARD",
      data: res.data.data,
    });
  } catch (error) {}
};
export const getDataTotalProduct = (dateStart, dateEnd) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    //truyền sai cú pháp params lưu ý
    const res = await axios.get(`${baseUrlTotalProduct}`, {
      params: {
        start_time: dateStart,
        end_time: dateEnd,
      },
    });
    dispatch({
      type: "GET_DATA_TOTAL_PRODUCTS",
      data: res.data.data.total_billing,
      static: res.data.data.statistics,
    });
  } catch (error) {}
};
export const getDataTotaMony = (dateStart, dateEnd) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    const res = await axios.get(`${baseUrlToTalMoney}`, {
      params: {
        start_time: dateStart,
        end_time: dateEnd,
      },
    });
    dispatch({
      type: "GET_DATA_TOTAL_MONEY",
      data: res.data.data.total_commission,
      static: res.data.data.statistics,
    });
  } catch (error) {}
};
export const getDataTotalUser = (dateStart, dateEnd) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    const res = await axios.get(`${baseUrlTotalUser}`, {
      params: {
        start_time: dateStart,
        end_time: dateEnd,
      },
    });
    dispatch({
      type: "GET_DATA_TOTAL_USER",
      static: res.data.data.statistics,
    });
  } catch (error) {}
};
export const getDataTotalUserLogin = (dateStart, dateEnd) => async (
  dispatch
) => {
  setAuthToken(getToken());
  try {
    const res = await axios.get(`${baseUrlTotalUserLogin}`, {
      params: {
        start_time: dateStart,
        end_time: dateEnd,
      },
    });
    dispatch({
      type: "GET_DATA_TOTAL_USER_LOGIN",
      data: res.data.data.statistics,
    });
  } catch (error) {}
};
