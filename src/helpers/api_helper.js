import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";
import * as url from "./url_helper";

//pass new generated access token here
const token = accessToken;

//apply base url for axios
const API_URL = "http://127.0.0.1:8000";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = 'JWT '+token;
axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi
      .get(url, { ...config })
      .then(response => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}



export default API_URL
