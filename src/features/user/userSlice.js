import {
  createSlice,
  createAsyncThunk,
  isFulfilled,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
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

export const addProductToFavorite = createAsyncThunk(
  "user/addProductToFavorite",
  async (productId, { rejectWithValue }) => {
    try {
      await addToFavorite(productId);
      return productId;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const removeProductFromFavorite = createAsyncThunk(
  "user/removeProductFromFavorite",
  async (productId, { rejectWithValue }) => {
    try {
      await removeFromFavorite(productId);
      return productId;
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.setItem("currentUser", null);
    },
    setNewAccessToken: (state, action) => {
      state.currentUser.accessToken = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
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
      })
      .addMatcher(
        isFulfilled(
          loginUser,
          signupUser,
          addProductToFavorite,
          removeProductFromFavorite
        ),
        (state) => {
          localStorage.setItem(
            "currentUser",
            JSON.stringify(state.currentUser)
          );
          state.error = null;
        }
      )
      .addMatcher(
        isRejectedWithValue(
          loginUser,
          signupUser,
          addProductToFavorite,
          removeProductFromFavorite
        ),
        (state, action) => {
          state.error = action.payload.message;
        }
      );
  },
});

export const { logoutUser, setNewAccessToken } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectAccessToken = (state) => state.user.currentUser?.accessToken;

export default userSlice.reducer;
