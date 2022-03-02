import { publicAxios, privateAxios } from "./axios";

export const fetchProducts = (page = 1) =>
  publicAxios.get(`products?page=${page}`);

export const fetchProductById = (id) => publicAxios.get(`products/${id}`);

export const getProductsBySearch = (searchQuery) =>
  publicAxios.get(`products?search=${searchQuery}`);

export const addProduct = (productData) =>
  privateAxios.post("products/", productData);

export const getFeaturedProducts = () =>
  publicAxios.get("products?featured=true");

export const getImageUploadUrl = (imageName) =>
  publicAxios.get(`products/imageUploadUrl/${imageName}`);

export const addProductImageUrl = (data) =>
  publicAxios.post("products/image", data);
