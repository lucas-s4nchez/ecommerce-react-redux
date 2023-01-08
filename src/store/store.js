import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { productsReducer } from "./products";
import { userReducer } from "./user";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    user: userReducer,
  },
});
