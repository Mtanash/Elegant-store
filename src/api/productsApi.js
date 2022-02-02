import axios from "axios";

const prodUrl = "https://elegant-store-api.herokuapp.com";
const devUrl = "http://localhost:5000";

const API = axios.create({
  baseURL: `${prodUrl}/products`,
});

export const fetchProducts = () => API.get("/");

export const addProduct = (productData) => API.post("/", productData);
