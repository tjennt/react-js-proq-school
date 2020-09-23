import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
import { toastSuccess, toastWarning } from "../../../utility/toast/toastHelper";
import { message } from "antd";
import { baseUrl } from "../../../utility/config";
import * as shopTypes from "../../types/shopTypes";
const baseUrlTest = `${baseUrl}/web/admin/shop`;
const baseUrlShopCategory = `${baseUrl}/web/admin/shop-category`;
export const getData = (params) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    //truyền sai cú pháp params lưu ý
    const res = await axios.get(baseUrlTest, {
      params,
    });
    dispatch({
      type: shopTypes.GET_DATA_SHOP,
      data: res.data.data.data,
      totalPages: res.data.data.total_page,
      params,
    });
  } catch (error) {}
};
export const filterData = (value) => {
  return (dispatch) => dispatch({ type: "FILTER_DATA", value });
};
//done
export const deleteData = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    axios.delete(`${baseUrlTest}/${obj.id}`).then((response) => {
      message.success("Xóa thành công!");
      dispatch(getData(params));
      dispatch({ type: shopTypes.DELETE_DATA_SHOP, obj });
    });
  };
};

export const updateData = (obj, params) => {
  return (dispatch) => {
    var formData = new FormData();
    if (obj.imgUpdate) {
      formData.append("img_shop", obj.imgUpdate[0].originFileObj);
    }
    if (!obj.imgUpdate && !obj.img) {
      formData.append("img_shop", obj.img);
    }
    formData.append("name", obj.name);
    formData.append("status", obj.status);
    axios
      .put(`${baseUrlTest}/${obj.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toastSuccess("Cập nhật thành công!");
        dispatch(getData(params));
        // dispatch({ type: shopTypes.UPDATE_DATA_SHOP, obj: response.data.data });
      });
  };
};
//done
export const addData = (obj, params) => {
  return (dispatch) => {
    var formData = new FormData();
    formData.append("name", obj.name);
    if (obj.imgUpdate)
      formData.append("img_shop", obj.imgUpdate[0].originFileObj);
    axios
      .post(baseUrlTest, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.code === 0) {
          toastSuccess("Thêm thành công!");
          dispatch(getData(params));
        } else {
          toastWarning("Vui lòng điền các trường cần thiết");
        }
      });
  };
};
//get data category
export const getShopCategory = (params) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    const res = await axios.get(`${baseUrlShopCategory}`, {
      params,
    });
    dispatch({
      type: shopTypes.GET_DATA_SHOP_CATEGORY,
      data: res.data.data.data,
      totalPages: res.data.data.total_page,
      params,
    });
  } catch (error) {}
};
