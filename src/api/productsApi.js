import { publicAxios, privateAxios } from "./axios";

export const fetchProducts = () => publicAxios.get("products/");

export const getProductsBySearch = (searchQuery) =>
  publicAxios.get(`products/search?searchQuery=${searchQuery}`);

export const addProduct = (productData) =>
  privateAxios.post("products/", productData);
