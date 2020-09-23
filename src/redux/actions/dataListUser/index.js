import axios from "axios";
import setAuthToken, { getToken } from "../../../utility/auth/setAuthToken";
import { baseUrl } from "../../../utility/config";
import * as userType from "../../types/userTypes";
const baseUrlTest = `${baseUrl}/web/admin/user`;
export const getData = (params) => async (dispatch) => {
  setAuthToken(getToken());
  try {
    const res = await axios.get(baseUrlTest, {
      params,
    });
    dispatch({
      type: userType.GET_DATA_USER,
      data: res.data.data.data,
      totalPages: res.data.data.total_page,
      params,
    });
  } catch (error) {}
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
      type: userType.GET_DATA_USER,
      data: res.data.data.data,
      totalPages: res.data.data.total_page,
      search,
    });
  } catch (error) {}
};
