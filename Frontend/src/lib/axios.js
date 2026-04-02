import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://wechat-vvru.onrender.com/api",
  withCredentials: true,
});
