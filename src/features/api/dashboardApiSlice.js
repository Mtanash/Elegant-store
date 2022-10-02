import { apiSlice } from "./apiSlice";

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => "dashboard",
      providesTags: ["orders"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = extendedApi;
