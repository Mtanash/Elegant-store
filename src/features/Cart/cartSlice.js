import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    productAddedToCart: (state, action) => {
      const { productToAdd, amount = 1 } = action.payload;
      const match = state.cartProducts.find(
        (product) => product._id === productToAdd._id
      );
      if (!match) {
        state.cartProducts.push({
          ...productToAdd,
          quantity: amount,
        });
      } else {
        state.cartProducts.forEach((product) => {
          if (product._id === productToAdd._id) {
            product.quantity += amount;
          }
        });
      }
    },
    productRemovedFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product._id !== action.payload
      );
    },
    cartCleared: (state) => {
      state.cartProducts = [];
    },
  },
  extraReducers: {},
});

export const { productAddedToCart, productRemovedFromCart, cartCleared } =
  cartSlice.actions;

export const selectCartProducts = (state) => state.cart.cartProducts;
export const selectCartProductsCount = (state) =>
  state.cart.cartProducts.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
export const selectCartProductsTotalPrice = (state) =>
  state.cart.cartProducts.reduce(
    (prev, current) => prev + current.price * current.quantity,
    0
  );

export default cartSlice.reducer;
