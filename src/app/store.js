import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/Cart/cartSlice";
import userReducer from "../features/user/userSlice";
import { apiSlice } from "../features/api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
