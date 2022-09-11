import { apiSlice } from "./apiSlice";

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
      }),
    }),
    getOrders: builder.query({
      query: () => "orders",
    }),
  }),
});

export const { useAddOrderMutation, useGetOrdersQuery } = extendedApi;
