import {
  createSlice,
  createAsyncThunk,
  isFulfilled,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { login, signup, updateAvatar, googleAuth } from "../../api/userApi";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await login(userData);
      return response?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await signup(userData);
      return response?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (avatar) => {
    await updateAvatar(avatar);
    return avatar;
  }
);

export const authWithGoogle = createAsyncThunk(
  "user/authWithGoogle",
  async (data, { rejectWithValue }) => {
    try {
      const response = await googleAuth(data);
      return response?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.setItem("user", null);
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
    userSavedToLocalStorage: (state) => {
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(authWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload.avatar;
      })
      .addMatcher(
        isFulfilled(loginUser, signupUser, authWithGoogle),
        (state) => {
          localStorage.setItem("user", JSON.stringify(state.user));
          state.error = null;
        }
      )
      .addMatcher(
        isRejectedWithValue(loginUser, signupUser, authWithGoogle),
        (state, action) => {
          state.error = action.payload.message;
        }
      );
  },
});

export const {
  logoutUser,
  productAddedToFavorite,
  productRemovedFromFavorite,
  userSavedToLocalStorage,
} = userSlice.actions;

export const selectCurrentUser = (state) => state.user.user;

export default userSlice.reducer;
