import axios from "axios";
import setAuthToken, { getToken } from "./../../../utility/auth/setAuthToken";
import {
  toastSuccess,
  toastWarning,
} from "./../../../utility/toast/toastHelper";
import { message } from "antd";
import { baseUrl } from "../../../utility/config";
import * as fcmType from "./../../types/fcmType";
const baseUrlTest = `${baseUrl}/web/admin/fcm`;
export const getData = (params) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    //truyền sai cú pháp params lưu ý
    const res = await axios.get(baseUrlTest, {
      params,
    });
    dispatch({
      type: fcmType.GET_DATA,
      data: res.data.data.data,
      totalPages: res.data.data.total_page,
      params,
    });
  } catch (error) {}
};
export const getDataSearch = (search) => {
  return (dispatch, getState) => {
    axios
      .get(baseUrlTest, {
        params: {
          search: search,
        },
      })
      .then((res) => {
        dispatch({
          type: fcmType.GET_DATA,
          data: res.data.data.data,
          totalPages: res.data.data.total_page,
          search,
        });
      });
  };
};

export const filterData = (value) => {
  return (dispatch) => dispatch({ type: "FILTER_DATA", value });
};
export const deleteData = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    axios.delete(`${baseUrlTest}/${obj.id}`).then((response) => {
      message.success("Xóa thành công!");
      dispatch(getData(params));
      dispatch({ type: fcmType.DELETE_DATA_PUSH, obj });
    });
  };
};

export const updateData = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    var formData = new FormData();
    formData.append("title", obj.title);
    if (obj.imgUpdate) {
      formData.append("img", obj.imgUpdate[0].originFileObj);
    }
    if (!obj.imgUpdate && !obj.img) {
      formData.append("img", obj.img);
    }
    formData.append("time_send", obj.time_send);
    formData.append("content", obj.body);
    formData.append("type", obj.type);
    formData.append("url", obj.url);
    formData.append("body", obj.body);
    axios
      .put(`${baseUrlTest}/${obj.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toastSuccess("Cập nhật thành công!");
        dispatch(getData(params));
        dispatch({ type: fcmType.UPDATE_DATA_PUSH, obj: response.data.data });
      });
  };
};
//done
export const addData = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    var formData = new FormData();
    formData.append("time_send", obj.time_send);
    formData.append("content", obj.content);
    formData.append("url", obj.url);
    formData.append("title", obj.title);
    if (obj.imgUpdate) formData.append("img", obj.imgUpdate[0].originFileObj);
    formData.append("body", obj.body);
    axios
      .post(baseUrlTest, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.code === 0) {
          toastSuccess("Thêm thành công!");
          dispatch({ type: fcmType.ADD_DATA_PUSH, obj: response.data.data });
          dispatch(getData(params));
        } else {
          toastWarning("Vui lòng điền các  trường cần thiết");
        }
      });
  };
};
