import axios from "axios";

const BACKEND_URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request
  .use
  // localStorage.getItem("token") != null
  //   ? (config) => {
  //       return config;
  //     }
  //   : (config) => {
  //       const token = localStorage.getItem("token");
  //       config.headers["Authorization"] = `Bearer ${token}`;
  //       return config;
  //     },
  // (error) => {
  //   Promise.reject(error);
  // }
  ();

export default axiosInstance;
