import axios from "axios";

const prodUrl = "https://elegant-store-api.herokuapp.com";
const devUrl = "http://localhost:5000";

const API = axios.create({
  baseURL: `${prodUrl}/users`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("currentUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("currentUser"))?.token
    }`;
  }
  return req;
});

export const login = (data) => API.post("/login", data);

export const signup = (data) => API.post("/", data);

export const updateAvatar = (avatar) => API.post("/me/avatar", avatar);

export const addToFavorite = (productId) =>
  API.post(`/addToFavorite`, productId);

export const removeFromFavorite = (productId) =>
  API.post(`/removeFromFavorite`, productId);
