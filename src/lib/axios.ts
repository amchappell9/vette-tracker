import Axios, { AxiosRequestConfig } from "axios";
import storage from "../storage/storage";

function requestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  const userInfo = storage.getUserInfo();

  if (!config.headers) {
    config.headers = {};
  }

  if (userInfo) {
    // @ts-expect-error - This is an issue with the current Axios release
    config.headers.Authorization = `Bearer ${userInfo.token.access_token}`;
  }

  return config;
}

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use((response) => response.data);
