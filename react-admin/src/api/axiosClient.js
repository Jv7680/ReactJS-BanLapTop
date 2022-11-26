import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  baseURL: "http://localhost:8080/",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// const userInfo = JSON.parse(localStorage.getItem("userInfo"));

// axiosClient.interceptors.request.use(async (config) => {
//   let userInfo = localStorage.getItem("userInfo");
//   if (userInfo) {
//     userInfo = JSON.parse(userInfo);
//     config.headers.Authorization = `Bearer ${userInfo.token}`;
//   }
//   return config;
// });

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const message =
      error?.response && error.response?.data?.message
        ? error?.response?.data?.message
        : error?.message;

    if (message === "Invalid Token") {
      localStorage.getItem("userInfo");
      document.location.href = "./login";
    }

    throw error;
  }
);

export default axiosClient;
