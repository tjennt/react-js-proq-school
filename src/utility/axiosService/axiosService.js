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
  get(url, params) {
    this.getHeaders();
    return axios.get(url, params);
  }
  post(url, body) {
    this.getHeaders();
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
