import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
