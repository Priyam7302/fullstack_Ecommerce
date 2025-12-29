import axios from "axios"

const instance = axios.create({
  // baseURL: import.meta.env.VITE_BASEURL || "http://localhost:3000",
  baseURL:"http://localhost:3000",

  withCredentials: true,
});

export default instance;