import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
import { baseUrl } from "../../../utility/config";
import * as voteApp from "../../types/voteApp";
import { toastSuccess } from "../../../utility/toast/toastHelper";
const baseUrlTest = `${baseUrl}/event/voteApp`;
export const getDataVoteApp = (params) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    //truyền sai cú pháp params lưu ý
    const res = await axios.get(baseUrlTest, {
      params,
    });
    dispatch({
      type: voteApp.GET_DATA_VOTE_APP,
      data: res.data.data.listVote,
      totalPages: res.data.data.total_page,
      params,
    });
  } catch (error) {}
};
export const addVoteApp = (obj, params) => {
  const data = {
    user_id: obj.id,
    name_user: obj.name,
    cash: obj.money,
    note: obj.note,
    status: obj.status,
    author: obj.donater,
  };
  return (dispatch) => {
    axios.post(`${baseUrlTest}`, data).then((res) => {
      dispatch({
        type: voteApp.ADD_DATA_VOTE_APP,
      });
      toastSuccess("Thêm thành công !");
      dispatch(getDataVoteApp(params));
    });
  };
};
export const updateVoteApp = (obj, params) => {
  let user_id = parseInt(obj.id);
  const data = {
    user_id: user_id,
    name_user: obj.name,
    cash: obj.money,
    note: obj.note,
    status: obj.status,
    author: obj.donater,
  };
  return (dispatch) => {
    axios.put(`${baseUrlTest}/${obj.id}`, data).then((res) => {
      dispatch(getDataVoteApp(params));
    });
    toastSuccess("Cập nhật thành công !");
  };
};
