import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/orderApi";

const initialState = {
  orders: [],
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData) => {
    const response = await api.createOrder(orderData);
    if (!response?.data) throw new Error("No data found");
    return response.data;
  }
);

export const getOrder = createAsyncThunk("order/getOrder", async (orderId) => {
  const response = await api.getOrder(orderId);
  if (!response?.data) throw new Error("No data found");
  return response.data;
});

export const getOrders = createAsyncThunk("order/getOrders", async () => {
  const response = await api.getOrders();
  if (!response?.data) throw new Error("No data found");
  return response.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [createOrder.fulfilled]: (state, { payload }) => {
      state.orders.push(payload);
    },
    [getOrders.fulfilled]: (state, { payload }) => {
      state.orders = payload;
    },
  },
});

export default orderSlice.reducer;
