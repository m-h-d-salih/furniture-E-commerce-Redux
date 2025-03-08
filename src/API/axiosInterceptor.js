import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({ baseURL: baseUrl });

axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("accesstoken");
    if (accessToken) {
      request.headers["authorization"] = `${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use((response) => response),
  (error) => Promise.reject(error);


export default axiosInstance;
