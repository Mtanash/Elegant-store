import { apiSlice } from "./apiSlice";

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: "users",
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "users/login",
        body: userData,
        method: "POST",
        credentials: "include",
      }),
    }),
    authWithGoogle: builder.mutation({
      query: (userData) => ({
        url: "users/googleAuth",
        method: "POST",
        body: userData,
      }),
    }),
    getUserAccessToken: builder.mutation({
      query: () => ({
        url: "users/refresh",
        method: "GET",
      }),
    }),
    addProductToFavorites: builder.mutation({
      query: (productId) => ({
        url: "users/addToFavorite",
        method: "POST",
        body: productId,
        credentials: "include",
      }),
      invalidatesTags: ["userFavoriteProducts"],
    }),
    removeProductFromFavorites: builder.mutation({
      query: (productId) => ({
        url: "users/removeFromFavorite",
        method: "POST",
        body: productId,
        credentials: "include",
      }),
      invalidatesTags: ["userFavoriteProducts"],
    }),
    getUserFavoriteProducts: builder.query({
      query: () => "users/me/favoriteProducts",
      providesTags: ["userFavoriteProducts"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useAuthWithGoogleMutation,
  useAddProductToFavoritesMutation,
  useGetUserAccessTokenMutation,
  useGetUserMutation,
  useRemoveProductFromFavoritesMutation,
  useGetUserFavoriteProductsQuery,
} = extendedApi;
