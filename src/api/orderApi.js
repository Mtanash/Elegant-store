import axios from "axios";

const prodUrl = "https://elegant-store-api.herokuapp.com";
const devUrl = "http://localhost:5000";

const API = axios.create({
  baseURL: `${prodUrl}/orders`,
});

export const createOrder = (orderData) => API.post("/", orderData);

export const deleteOrder = (orderId) => API.delete(`/${orderId}`);

export const getOrders = () => API.get("/");

export const getOrder = (orderId) => API.get(`/${orderId}`);
