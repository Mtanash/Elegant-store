import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().user.accessToken;
      if (accessToken) {
        headers.set("authorization", "Bearer " + accessToken);
      }
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: [
    "products",
    "userReviewedProduct",
    "userFavoriteProducts",
    "orders",
  ],
  endpoints: () => ({}),
});
