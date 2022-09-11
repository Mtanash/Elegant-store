import { apiSlice } from "./apiSlice";

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => "dashboard",
    }),
  }),
});

export const { useGetDashboardDataQuery } = extendedApi;
