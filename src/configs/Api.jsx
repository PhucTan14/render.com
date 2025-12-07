import axios from "axios";
const BASE_URL = "https://main.yumspot.online/api";

export const endpoints = {
  project:  "/project",
  register: "/auth/register",
  login: "/auth/login",
  projects: "/projects"
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
