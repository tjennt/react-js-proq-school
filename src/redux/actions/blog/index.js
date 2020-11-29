import * as blogType from "../../constants/blog";
export const getCategory = () => ({
  type: blogType.GET_CATEGORY,
});
export const getCategorySuccess = (data) => ({
  type: blogType.GET_CATEGORY_SUCCESS,
  payload: {
    data,
  },
});
export const addBlog = (params, data) => ({
  type: blogType.ADD_BLOG,
  payload: {
    params,
    data,
  },
});
export const updateBlog = (params, data) => ({
  type: blogType.UPDATE_BLOG,
  payload: {
    params,
    data,
  },
});
export const getNotifyAll = (params) => ({
  type: blogType.GET_ALL_NOTIFY,
  payload: {
    params,
  },
});
export const getNotifyAllSuccess = (data, total_page, total_item) => ({
  type: blogType.GET_ALL_NOTIFY_SUCCESS,
  payload: {
    data,
    total_page,
    total_item,
  },
});
export const setTaskEdit = (data) => ({
  type: blogType.SET_TASK_EDIT_BLOG,
  payload: {
    data,
  },
});
export const deleteTask = (id, params) => ({
  type: blogType.DELETE_BLOG,
  payload: {
    id,
    params,
  },
});
