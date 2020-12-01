import axiosService from "../../../utility/axiosService/axiosService";
const url = "staff/type-notify";
export const getDataCategoryApi = () => {
  return axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/${url}`);
};
export const addBlogApi = (data) => {
  return axiosService.post(
    `${process.env.REACT_APP_API_ENDPOINT}/staff/notify`,
    data
  );
};
export const updateBlogApi = (id, data) => {
  return axiosService.put(
    `${process.env.REACT_APP_API_ENDPOINT}/staff/notify/${id}`,
    data
  );
};
export const getNotiApi = (params) => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/staff/notify`,
    { params }
  );
};
export const deleteNotiApi = (id) => {
  return axiosService.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/staff/notify/${id}`
  );
};
/**
 * student
 */
export const getDataFeeNoti = (params) => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/staff/notify/fee`,
    {
      params,
    }
  );
};

export const getDataActivityNoti = (params) => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/staff/notify/activity`,
    {
      params,
    }
  );
};

export const getDataLearningNoti = (params) => {
  return axiosService.get(
    `${process.env.REACT_APP_API_ENDPOINT}/staff/notify/learning`,
    {
      params,
    }
  );
};
