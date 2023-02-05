import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";
import * as url from "./url_helper";
import {POST_JWT_REFRESH} from "./url_helper";

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

const refreshRequest = async (refresh, access) => {
    try {
        const { data } = await axiosApi.post(API_URL+POST_JWT_REFRESH, {
            refresh, access
        })
        if (data?.access_token) {
            localStorage.setItem("access_token", data.access_token)
        }
    } catch (err) {
        return err
    }
}

axiosApi.interceptors.response.use(response => {
   return response;
}, async (err) => {

   const originalRequest = err.config;
   const refresh_token = localStorage.getItem("refresh_token")
   const access_token = localStorage.getItem("access_token")

   if (
       403 === err?.response?.status &&
       refresh_token && access_token &&
       !originalRequest._retry
   ) {
     originalRequest._retry = true;

     try {
        await refreshRequest(refresh_token, access_token)

         return axiosApi(originalRequest)
     } catch (_err) {
       return Promise.reject(_err)
     }
   }
});


export default API_URL
