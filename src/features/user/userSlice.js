import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  signup,
  addToFavorite,
  removeFromFavorite,
  updateAvatar,
} from "../../api/userApi";

const initialState = {
  currentUser: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData) => {
    const response = await login(userData);
    if (!response?.data) throw new Error("No data found");
    return response.data;
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userData) => {
    const response = await signup(userData);
    if (!response?.data) throw new Error("No data found");
    return response.data;
  }
);

export const addProductToFavorite = createAsyncThunk(
  "user/addProductToFavorite",
  async (productId) => {
    await addToFavorite(productId);
    return productId;
  }
);

export const removeProductFromFavorite = createAsyncThunk(
  "user/removeProductFromFavorite",
  async (productId) => {
    await removeFromFavorite(productId);
    return productId;
  }
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (avatar) => {
    await updateAvatar(avatar);
    return avatar;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.currentUser = null;
      localStorage.setItem("currentUser", null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      })
      .addCase(addProductToFavorite.fulfilled, (state, action) => {
        state.currentUser.user.favoriteProducts.push(action.payload._id);
      })
      .addCase(removeProductFromFavorite.fulfilled, (state, action) => {
        const newFavoriteProducts =
          state.currentUser.user.favoriteProducts.filter(
            (product) => product.toString() !== action.payload._id
          );
        state.currentUser.user.favoriteProducts = newFavoriteProducts;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.currentUser.user.avatar = action.payload.avatar;
      });
  },
});

export default userSlice.reducer;

export const { logoutUser } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
