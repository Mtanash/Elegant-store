import { apiSlice } from "./apiSlice";

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page) => `products?page=${page}`,
    }),
    getProductsByLimit: builder.query({
      query: (limit) => `products?limit=${limit}`,
    }),
    getFeaturedProducts: builder.query({
      query: () => "products?featured=true",
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getProductsBySearch: builder.query({
      query: (searchQuery, page) =>
        `/products?search=${searchQuery}&page=${page}`,
    }),
    getProductReviews: builder.query({
      query: (productId) => `products/reviews/${productId}`,
    }),
    addReview: builder.mutation({
      query: (review) => ({
        url: "products/reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["userReviewedProduct"],
    }),
    getUserReviewedProduct: builder.query({
      query: (productId) => `products/reviews/userReviewedProduct/${productId}`,
      providesTags: ["userReviewedProduct"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetFeaturedProductsQuery,
  useGetProductsBySearchQuery,
  useGetProductReviewsQuery,
  useAddReviewMutation,
  useGetUserReviewedProductQuery,
  useGetProductsByLimitQuery,
} = extendedApi;
