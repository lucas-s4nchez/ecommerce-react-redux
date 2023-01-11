import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  favorites: [],
  cart: [],
  totalItemsInCart: 0,
  totalToPay: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setFavorites: (state, { payload }) => {
      state.favorites = payload;
    },
    addProductToFavorites: (state, { payload }) => {
      state.favorites.push(payload);
    },
    deleteProductFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (product) => product.id !== action.payload
      );
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
    setCart: (state, { payload }) => {
      state.cart = payload;
      state.totalToPay = state.cart.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
      state.totalItemsInCart = state.cart.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
    },
    addProductToCart: (state, { payload }) => {
      state.cart.push(payload);
      state.totalItemsInCart = state.totalItemsInCart + 1;
      state.totalToPay = state.totalToPay + payload.price;
    },
    deleteProductFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((product) => product.id !== payload);
    },
    addUnitToProduct: (state, { payload }) => {
      state.cart = state.cart.map((product) => {
        return product.id === payload.id
          ? { ...product, quantity: product.quantity + 1 }
          : product;
      });
      state.totalItemsInCart = state.totalItemsInCart + 1;
      state.totalToPay = state.totalToPay + payload.price;
    },
    subtractUnitToProduct: (state, { payload }) => {
      state.cart = state.cart.map((product) => {
        return product.id === payload
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      });
    },
    clearCart: (state) => {
      state.isLoading = false;
      state.cart = [];
    },
  },
});

export const {
  isLoading,
  setFavorites,
  addProductToFavorites,
  deleteProductFromFavorites,
  clearFavorites,
  setCart,
  addProductToCart,
  deleteProductFromCart,
  addUnitToProduct,
  subtractUnitToProduct,
  clearCart,
} = userSlice.actions;

export default userSlice.reducer;
