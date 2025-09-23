import axios from "axios";
import { toast } from "react-hot-toast";
import { domain, frontend } from "../../utils/APIRoutes";

const axiosInstance = axios.create({
  baseURL: domain,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("logindataen")}`,
      token: `Bearer ${localStorage.getItem("logindataen")}`,
      ...config.headers,
    };
    return config;
  },
  (err) => Promise.reject(err)
);

const errorHandler = (error) => {
  if (error?.response?.data?.message) {
    toast.error(error?.response?.data?.message);
  }
  // return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.msg === "Invalid Token.") {
      toast("Logged in on another device.", { id: 1 });
      // localStorage.clear();
      // sessionStorage.clear();
      // window.location.href = `${frontend}`;
      return Promise.reject(new Error("Invalid Token."));
    }
    return response;
  },
  (error) => {
    return Promise.reject({
      msg: error?.message || "Unknown error occurred.",
    });
  }
);

export default axiosInstance;
