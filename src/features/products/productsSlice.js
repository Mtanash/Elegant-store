import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addProduct } from "../../api/productsApi";
import { sizes, sorts } from "../../constants";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData) => {
    const response = await addProduct(productData);
    if (!response?.data) throw new Error("No data found");
    return response.data;
  }
);

const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsSorted: (state, action) => {
      const sortType = action.payload;
      state.filteredProducts.sort((a, b) => {
        if (sortType === sorts.lowest) {
          return a.price - b.price;
        } else if (sortType === sorts.highest) {
          return b.price - a.price;
        } else {
          return a.createdAt < b.createdAt ? -1 : 1;
        }
      });
    },
    productsFiltered: (state, action) => {
      const sizeType = action.payload;
      if (sizeType === sizes.all) {
        state.filteredProducts = state.products;
        return;
      }
      state.filteredProducts = state.products.filter((product) =>
        product.sizes.includes(sizeType)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.filteredProducts.push(action.payload);
    });
  },
});

export const { productsSorted, productsFiltered } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectFilteredProducts = (state) =>
  state.products.filteredProducts;
export const selectProductById = (state, id) =>
  state.products.products.find((product) => product._id === id);

export default productsSlice.reducer;
