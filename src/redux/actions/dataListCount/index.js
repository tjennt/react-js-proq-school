import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
import { baseUrl } from "../../../utility/config";
import { message } from "antd";
import * as countType from "../../types/countType";
const baseUrlTest = `${baseUrl}/web/admin/coupon`;
export const getData = (params) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    //truyền sai cú pháp params lưu ý
    const res = await axios.get(baseUrlTest, {
      params,
    });
    dispatch({
      type: countType.GET_DATA_COUNT,
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
      type: countType.GET_DATA_COUNT,
      data: res.data.data.data,
      totalPages: res.data.data.total_page,
      search,
    });
  } catch (error) {}
};
export const deleteData = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    axios.delete(`${baseUrlTest}/${obj.id}`).then((response) => {
      message.success("Xoá thành công!");
      dispatch(getData(params));
      dispatch({ type: countType.DELETE_DATA_cOUNT, obj });
    });
  };
};
