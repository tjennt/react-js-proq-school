import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
import { toastSuccess, toastWarning } from "../../../utility/toast/toastHelper";
import { baseUrl } from "./../../../utility/config/index";
import { message } from "antd";
import * as blogType from "./../../types/BlogTypes";
const baseUrlTest = `${baseUrl}/web/admin/blog`;
export const getDataBlog = (params) => {
  return async (dispatch) => {
    setAuthToken(getToken());
    await axios.get(baseUrlTest, { params }).then((response) => {
      dispatch({
        type: blogType.GET_DATA_BLOG,
        dataBlog: response.data.data.list_blog,
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
      type: blogType.GET_DATA_BLOG,
      dataBlog: res.data.data.list_blog,
      totalPages: res.data.data.total_page,
      search,
    });
  } catch (error) {}
};
export const getDataTagToBlog = (param) => {
  return async (dispatch) => {
    await axios
      .get(`${baseUrl}/web/admin/blog/${param}/tag`)
      .then((response) => {
        dispatch({
          type: blogType.GET_TAG_TO_BLOG,
          data: response.data.data.Tags,
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
    axios
      .delete(`${baseUrlTest}/${obj.id}`)
      .then((response) => {
        dispatch(getDataBlog(params));
        message.success("Xóa thành công !");
        dispatch({ type: blogType.DELETE_DATA_BLOG, obj });
      })
      .catch((err) => {
        toastWarning("Vui lòng xóa Tag trước khi xóa tin tức!  ");
      });
  };
};

export const updateData = (obj, params) => {
  return (dispatch) => {
    var formData = new FormData();
    if (obj.imgUpdate)
      formData.append("thump_img", obj.imgUpdate[0].originFileObj);

    if (!obj.imgUpdate && !obj.thump_image) {
      formData.append("img", obj.thump_image);
    }
    formData.append("title", obj.title);
    formData.append("seo_description", obj.seo_description);
    formData.append("description", obj.description);
    formData.append("seo_title", obj.seo_title);
    formData.append("seo_keywords", obj.seo_keywords);
    formData.append("content_detail", obj.content_detail);
    formData.append("url", obj.url);
    formData.append("alt_blog", obj.alt);
    formData.append("author", obj.author);
    formData.append("schema", obj.schema);
    formData.append("category_blog", obj.category);
    formData.append("list_tag", JSON.stringify(obj.tagUpdate));
    axios
      .put(`${baseUrlTest}/${obj.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toastSuccess("Cập nhật thành công!");
        dispatch(getDataBlog(params));
        dispatch({ type: blogType.UPDATE_DATA_BLOG, obj: response.data.data });
      })
      .catch((err) => {
        message.error("Don't add Tag to blog");
      });
  };
};
export const addData = (obj) => {
  return (dispatch, getState) => {
    let params = getState().dataList.params;
    var formData = new FormData();
    let tag = obj.tag;
    var array = JSON.parse("[" + tag + "]");
    if (tag) {
      formData.append("list_tag", JSON.stringify(obj.tag));
    } else {
      formData.append("list_tag", array);
    }
    if (obj.imgUpdate) {
      formData.append("thump_img", obj.imgUpdate[0].originFileObj);
    }
    formData.append("title", obj.title);
    formData.append("description", obj.description);
    formData.append("seo_description", obj.seo_description);
    formData.append("seo_title", obj.seo_title);
    formData.append("content_detail", obj.content_detail);
    formData.append("seo_keywords", obj.seo_keywords);
    formData.append("url", obj.url);
    formData.append("alt_blog", obj.alt);
    formData.append("author", obj.author);
    formData.append("schema", obj.schema);
    formData.append("category_blog", obj.category);
    axios
      .post(baseUrlTest, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toastSuccess("Thêm thành công!");
        dispatch({
          type: blogType.ADD_DATA_BLOG,
          obj: response.data.data.createBlog,
        });
        dispatch(getDataBlog(params));
      })
      .catch((error) => {
        toastWarning("Vui lòng thêm trường có đánh dấu *");
      });
  };
};
