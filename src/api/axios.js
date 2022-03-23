import axios from "axios";

const baseURL = "https://elegant-store-api.herokuapp.com/";

const publicAxios = axios.create({
  baseURL,
  withCredentials: true,
});

const privateAxios = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export { privateAxios, publicAxios };
