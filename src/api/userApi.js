import { publicAxios, privateAxios } from "./axios";

export const refreshToken = () => publicAxios.get("users/refresh");

export const login = (data) => publicAxios.post("users/login", data);

export const signup = (data) => publicAxios.post("users/", data);

export const googleAuth = (data) => publicAxios.post("users/googleAuth", data);

export const updateAvatar = (avatar) =>
  privateAxios.post("users/me/avatar", avatar);

export const addToFavorite = (productId) =>
  privateAxios.post(`users/addToFavorite`, productId);

export const removeFromFavorite = (productId) =>
  privateAxios.post(`users/removeFromFavorite`, productId);

export const getUserFavoriteProducts = () =>
  privateAxios.get("users/me/favoriteProducts");

export const getUserOrders = () => privateAxios.get("users/me/orders");
