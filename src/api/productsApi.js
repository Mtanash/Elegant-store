import axios from "axios";

const API = axios.create({
  baseURL: "https://elegant-store-api.herokuapp.com/products",
});

export const fetchProducts = () => API.get("/");

export const addProduct = (productData) => API.post("/", productData);
