import { apiSlice } from "./apiSlice";

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page) => `products?page=${page}`,
      providesTags: ["products"],
    }),
    getProductsByLimit: builder.query({
      query: (limit) => `products?limit=${limit}`,
      providesTags: ["products"],
    }),
    getFeaturedProducts: builder.query({
      query: () => "products?featured=true",
      providesTags: ["products"],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getProductsByCategory: builder.query({
      query: ({ category, page }) =>
        `/products?category=${category}&page=${page}`,
    }),
    getProductsBySearch: builder.query({
      query: (searchQuery, page) =>
        `/products?search=${searchQuery}&page=${page}`,
      providesTags: ["products"],
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
    addNewProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, productData }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: productData,
      }),
      invalidatesTags: ["products"],
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
  useAddNewProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductsByCategoryQuery,
} = extendedApi;
