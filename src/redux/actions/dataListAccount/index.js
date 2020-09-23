import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
import { toastSuccess, toastError } from "../../../utility/toast/toastHelper";
import { baseUrl } from "./../../../utility/config/index";
import { message } from "antd";
const baseUrlTest = `${baseUrl}/web/admin/admin`;
export const getData = (params) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    const res = await axios.get(baseUrlTest, {
      params,
    });
    dispatch({
      type: "GET_DATA_ADMIN",
      data: res.data.data.data,
      totalPages: res.data.data.total_page,
      params,
    });
  } catch (error) {}
};
export const addData = (obj, params) => {
  return (dispatch) => {
    let formData = new FormData();
    formData.append("fullname", obj.fullname);
    formData.append("email", obj.email);
    formData.append("role", obj.role);
    formData.append("password", obj.password);
    axios
      .post(`${baseUrlTest}`, formData)
      .then((res) => {
        toastSuccess("Thêm dữ liệu thành công!");
        dispatch(getData(params));
      })
      .catch((res) => toastError(res));
  };
};
export const updateStatus = (obj, params) => {
  return (dispatch) => {
    let formData = new FormData();
    formData.append("fullname", obj.fullname);
    formData.append("email", obj.email);
    formData.append("role", obj.role);
    if (obj.password) formData.append("password", obj.password);
    if (obj.active === 1) {
      formData.append("active", 0);
    } else {
      formData.append("active", 1);
    }
    axios
      .put(`${baseUrlTest}/${obj.id}`, formData)
      .then((res) => {
        message.success("Đã cập nhật trạng thái! ");
        dispatch(getData(params));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const updateData = (obj, params) => {
  return (dispatch) => {
    let formData = new FormData();
    formData.append("fullname", obj.fullname);
    formData.append("email", obj.email);
    formData.append("role", obj.role);
    formData.append("active", obj.active);
    if (obj.password) formData.append("password", obj.password);
    axios
      .put(`${baseUrlTest}/${obj.id}`, formData)
      .then((res) => {
        toastSuccess("Cập nhật thành công !");
        dispatch(getData(params));
      })
      .catch((err) => {
        // toastWarning("Cập nhật không thành công!");
      });
  };
};
