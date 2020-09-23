import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
// import { toastSuccess, toastWarning } from "../../../utility/toast/toastHelper";
// import { message } from "antd";
import * as categoryTypes from "../../types/catagoryTypes";
import { baseUrl } from "../../../utility/config";
import { toastSuccess, toastWarning } from "../../../utility/toast/toastHelper";
import { message } from "antd";
const baseUrlTest = `${baseUrl}/web/admin/category`;
export const getDataCategory = (params) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    //truyền sai cú pháp params lưu ý
    const res = await axios.get(baseUrlTest, {
      params,
    });
    dispatch({
      type: categoryTypes.GET_CATEGORY,
      data: res.data.data.data,
      totalPages: res.data.data.total_page,
      params,
    });
  } catch (error) {}
};
export const deleteData = (obj, params) => {
  return (dispatch) => {
    axios
      .delete(`${baseUrlTest}/${obj.id}`)
      .then((res) => {
        message.success("Xóa thành công!");
        dispatch(getDataCategory(params));
      })
      .catch((err) => {
        toastWarning("Vui lòng xóa tag trong tin tức!");
      });
  };
};
export const addData = (obj, params) => {
  return (dispatch) => {
    const data = {
      name: obj.name,
    };
    axios
      .post(baseUrlTest, data)
      .then((res) => {
        dispatch({
          type: categoryTypes.ADD_CATEGORY,
        });
        toastSuccess("Thêm thể loại thành công!");
        dispatch(getDataCategory(params));
      })
      .catch((err) => {
        toastWarning("Thêm thể loại thất bại!");
      });
  };
};
export const updateData = (obj, params) => {
  return (dispatch) => {
    let status = 0;
    if (obj.status === 1) {
      status = 0;
    } else {
      status = 1;
    }
    const data = {
      status: status,
    };
    axios.put(`${baseUrlTest}/${obj.id}`, data).then((res) => {
      dispatch({
        type: categoryTypes.UPDATE_CATEGORY,
      });
      toastSuccess(" Cập nhật thành công !");

      dispatch(getDataCategory(params));
    });
  };
};
