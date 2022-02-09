import { publicAxios, privateAxios } from "./axios";

export const fetchProducts = () => publicAxios.get("products/");

export const addProduct = (productData) =>
  privateAxios.post("products/", productData);
