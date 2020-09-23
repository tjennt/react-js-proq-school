import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
import { toastSuccess } from "../../../utility/toast/toastHelper";
import { baseUrl } from "../../../utility/config";
import * as reward from "../../types/rewardTypes";
const baseUrlTest = `${baseUrl}/event/rotation`;
export const getDataRewards = (params) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    const res = await axios.get(baseUrlTest, {
      params,
    });
    dispatch({
      type: reward.GET_DATA_REWARD,
      data: res.data.data.list,
      totalPages: res.data.data.total_page,
      params,
    });
  } catch (error) {}
};
export const updateDataReward = (row, params) => {
  const status = {
    status: 1,
  };
  return (dispatch) => {
    axios.put(`${baseUrlTest}/${row._id}`, status).then((res) => {
      dispatch(getDataRewards(params));
      toastSuccess("Đã thay đổi trạng thái !");
    });
  };
};
