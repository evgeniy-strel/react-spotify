import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { openLoginPage, refreshToken } from "../auth";

export const instance = axios.create({
  baseURL: "https://api.spotify.com/v1/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

interface IRequestConfig extends InternalAxiosRequestConfig {
  _isRetry: boolean;
}

let isOpenedLoginPage = false;

instance.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  async (error: AxiosResponse) => {
    const originalRequest = error.config as IRequestConfig;
    if (error.status === 401 && originalRequest && !originalRequest._isRetry) {
      /** Флаг для избежания зацикливания обновления токена, если запрос упал с ошибкой */
      originalRequest._isRetry = true;
      try {
        const response = await refreshToken();
        if (
          response?.status !== 200 &&
          !isOpenedLoginPage &&
          !window.location.href.includes("?code")
        ) {
          openLoginPage();
          isOpenedLoginPage = true;
        }
        const request = instance.request(originalRequest);
        // window.location.reload();
        return request;
      } catch (error) {
        console.log("Unauthorized");
      }
    }
    return Promise.reject(error);
  }
);
