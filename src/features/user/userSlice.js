import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    accessTokenRefreshed: (state, action) => {
      state.accessToken = action.payload;
    },
    userDataRefreshed: (state, action) => {
      state.user = action.payload;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    productAddedToFavorite: (state, action) => {
      state.user.favoriteProducts.push(action.payload._id);
    },
    productRemovedFromFavorite: (state, action) => {
      const newFavoriteProducts = state.user.favoriteProducts.filter(
        (product) => product.toString() !== action.payload._id
      );
      state.user.favoriteProducts = newFavoriteProducts;
    },
  },
});

export const {
  userLoggedOut,
  productAddedToFavorite,
  productRemovedFromFavorite,
  userLoggedIn,
  accessTokenRefreshed,
  userDataRefreshed,
} = userSlice.actions;

export const selectCurrentUser = (state) => state.user.user;

export default userSlice.reducer;
