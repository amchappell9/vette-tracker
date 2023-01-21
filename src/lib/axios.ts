import Axios, { AxiosRequestConfig } from "axios";
import storage from "../storage/storage";

function requestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  const userInfo = storage.getUserInfo();

  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token.access_token}`;
  }

  return config;
}

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use((response) => response.data);
