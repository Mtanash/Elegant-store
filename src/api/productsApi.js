import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/products",
});

export const fetchProducts = () => API.get("/");

export const addProduct = (productData) => API.post("/", productData);
