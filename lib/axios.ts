import Axios, { InternalAxiosRequestConfig } from "axios";

function requestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  return config;
}

export const axios = Axios.create({
  baseURL: "/api",
});

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use((response) => response.data);
