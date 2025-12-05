import axios from "axios";
const BASE_URL = "http://47.129.137.90:9000";

export const endpoints = {
  project:  "/project",
  register: "/auth/register",
  login: "/auth/login"
};

export const authApis = (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default axios.create({
  baseURL: BASE_URL,
});
