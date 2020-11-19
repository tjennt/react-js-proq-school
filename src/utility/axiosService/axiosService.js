import axios from "axios";
import { getToken } from "../auth/setAuthToken";
class axiosService {
  getHeaders = () => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["authorization"];
    }
  };

  handSuccess(response) {
    return response;
  }
  handError(error) {
    return Promise.reject(error);
  }
  getExportExcel(url, params) {
    this.getHeaders();
    return axios({
      url: url, //your url
      method: "GET",
      responseType: "blob",
      params, // important
    });
  }
  get(url, params) {
    this.getHeaders();
    return axios.get(url, params);
  }
  postData(url, body) {
    this.getHeaders();
    return axios.post(url, body);
  }
  post(url, body) {
    return axios.post(url, body);
  }
  put(url, body) {
    this.getHeaders();
    return axios.instance.put(url, body);
  }
  delete(url) {
    this.getHeaders();
    return axios.instance.delete(url);
  }
}
export default new axiosService();
