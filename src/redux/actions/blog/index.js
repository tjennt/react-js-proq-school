import { toastSuccess } from "../../../utility/toast/toastHelper";
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

/**
 * student
 */
export const getDataNotiFee = (params) => ({
  type: blogType.GET_NOTI_FEE_STUDENT,
  payload: {
    params,
  },
});
export const getDataNotiFeeSuccess = (data, total_page) => ({
  type: blogType.GET_NOTI_FEE_STUDENT_SUCCESS,
  payload: {
    data,
    total_page,
  },
});

export const getDataNotiActivity = (params) => ({
  type: blogType.GET_NOTI_ACTIVITY_STUDENT,
  payload: {
    params,
  },
});
export const getDataNotiActivitySuccess = (data, total_page) => ({
  type: blogType.GET_NOTI_ACTIVITY_STUDENT_SUCCESS,
  payload: {
    data,
    total_page,
  },
});

export const getDataNotiLearning = (params) => ({
  type: blogType.GET_NOTI_LEARNING_STUDENT,
  payload: {
    params,
  },
});
export const getDataNotiLearningSuccess = (data, total_page) => ({
  type: blogType.GET_NOTI_LEARNING_STUDENT_SUCCESS,
  payload: {
    data,
    total_page,
  },
});
/**
 * get noti socket
 */
export const getAllNotiSocket = (data) => ({
  type: blogType.GET_ALL_NOTI_SOCKET,
  payload: {
    data,
  },
});
export const getnotiSocket = (socket, role) => {
  return (dispatch) => {
    socket.on("ON_NOTIFY", (data) => {
      if (role === "student" || role === "teacher") {
        toastSuccess("Có thông báo mới!!!!");
      } else {
        return false;
      }
      dispatch(getAllNotiSocket(data));
      switch (data.type) {
        case "activity":
          dispatch({
            type: blogType.GET_NOTI_SOCKET_ACTIVITY,
            data: data,
          });
          break;
        case "fee":
          dispatch({
            type: blogType.GET_NOTI_SOCKET_FEE,
            data: data,
          });
          break;
        case "learning":
          dispatch({
            type: blogType.GET_NOTI_SOCKET_LEARNING,
            data: data,
          });
          break;
        default:
          return false;
      }
    });
  };
};
export const checkUserSeenNoti = () => ({
  type: blogType.CHECK_USER_SEEN_NOTI,
});
export const getBlogDetail = (id) => ({
  type: blogType.GET_NOTI_DETAIL,
  payload: {
    id,
  },
});
export const getBlogDetailSuccess = (data) => ({
  type: blogType.GET_NOTI_DETAIL_SUCCESS,
  payload: {
    data,
  },
});
