import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { productsReducer } from "./products";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});
