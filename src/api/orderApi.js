import { publicAxios, privateAxios } from "./axios";

export const createOrder = (orderData) =>
  privateAxios.post("orders", orderData);

export const deleteOrder = (orderId) =>
  privateAxios.delete(`orders/${orderId}`);

export const getOrders = () => privateAxios.get("orders");

export const getOrder = (orderId) => privateAxios.get(`orders/${orderId}`);
