import axios from "axios";

const API = axios.create({
  baseURL: "https://elegant-store-api.herokuapp.com/orders",
});

export const createOrder = (orderData) => API.post("/", orderData);

export const deleteOrder = (orderId) => API.delete(`/${orderId}`);

export const getOrders = () => API.get("/");

export const getOrder = (orderId) => API.get(`/${orderId}`);
