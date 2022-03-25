import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/Cart/cartSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
