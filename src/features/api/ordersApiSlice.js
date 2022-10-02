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
      providesTags: ["orders"],
    }),
    getOrder: builder.query({
      query: (orderId) => `orders/${orderId}`,
      providesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useDeleteOrderMutation,
} = extendedApi;
