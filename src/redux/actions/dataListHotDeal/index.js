import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
import { toastSuccess } from "../../../utility/toast/toastHelper";
import { baseUrl } from "../../../utility/config";
import * as hotDealTypes from "../../types/hotdealTypes";
import { message } from "antd";
const baseUrlTest = `${baseUrl}/web/admin/hotdeal`;
export const getDataHotDeal = (params) => {
  return async (dispatch) => {
    setAuthToken(getToken());
    await axios.get(baseUrlTest, { params }).then((response) => {
      dispatch({
        type: hotDealTypes.GET_DATA_HOT_DEAL,
        data: response.data.data.data,
        totalPages: response.data.data.total_page,
        params,
      });
    });
  };
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
      type: hotDealTypes.GET_DATA_HOT_DEAL,
      data: res.data.data.data,
      totalPages: res.data.data.total_page,
      search,
    });
  } catch (error) {}
};
export const deleteData = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    axios.delete(`${baseUrlTest}/${obj.key_check}`).then((response) => {
      message.success("Xóa thành công!");
      dispatch(getDataHotDeal(params));
      dispatch({ type: hotDealTypes.DELETE_HOT_DEAL, obj });
    });
  };
};

export const updateData = (obj, params) => {
  return (dispatch) => {
    const dataObj = {
      name: obj.name,
      image: obj.image,
      link: obj.link,
      original_price: obj.original_price,
      current_price: obj.current_price,
    };
    const url = `${baseUrl}/web/admin/hotdeal/${obj.key_check}`;
    const data = dataObj;
    const headers = {
      "Content-Type": "application/json",
    };
    axios.put(url, data, headers).then((response) => {
      toastSuccess("Cập nhật thành công !");
      dispatch(getDataHotDeal(params));
      dispatch({
        type: hotDealTypes.UPDATE_DATA_HOT_DEAL,
        obj: response.data.data,
      });
    });
  };
};
