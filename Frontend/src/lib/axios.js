import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://wechat-qs2z.onrender.com/api",
  withCredentials: true,
});
