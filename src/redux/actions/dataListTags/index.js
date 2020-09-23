import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
import { toastSuccess, toastWarning } from "../../../utility/toast/toastHelper";
import { message } from "antd";
import { baseUrl } from "../../../utility/config";
import * as tagTypes from "./../../types/tagTypes";
const baseUrlTest = `${baseUrl}/web/admin/blog/list-tag`;
const baseUrlAddTags = `${baseUrl}/web/admin/blog/tag`;
export const getDataTags = (params) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    //truyền sai cú pháp params lưu ý
    const res = await axios.get(baseUrlTest, {
      params,
    });
    dispatch({
      type: tagTypes.GET_DATA_TAGS,
      data: res.data.data.list_tag,
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
      type: tagTypes.GET_DATA_TAGS,
      data: res.data.data.list_tag,
      totalPages: res.data.data.total_page,
      search,
    });
  } catch (error) {}
};
export const deleteData = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    axios
      .delete(`${baseUrlAddTags}/${obj.id}`)
      .then((res) => {
        message.success("Xóa thành công!");
        dispatch(getDataTags(params));
      })
      .catch((err) => {
        toastWarning("Vui lòng xóa tag trong tin tức!");
      });
  };
};
export const addDataTags = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    const { id, ...result } = obj;
    axios
      .post(baseUrlAddTags, result)
      .then((res) => {
        dispatch({
          type: tagTypes.ADD_TAGS,
          data: res.data.data.new_tag,
        });
        toastSuccess("Thêm tag thành công!");
        dispatch(getDataTags(params));
      })
      .catch((err) => {
        toastWarning("Tag đã tồn tại!");
      });
  };
};
