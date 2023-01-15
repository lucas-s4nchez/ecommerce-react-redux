import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  disabled: false,
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
    disabled: (state) => {
      state.disabled = !state.disabled;
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
      state.totalItemsInCart = state.totalItemsInCart + payload.quantity;
      state.totalToPay = state.totalToPay + payload.price * payload.quantity;
    },
    deleteProductFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((product) => product.id !== payload.id);
      state.totalItemsInCart = state.totalItemsInCart - payload.quantity;
      state.totalToPay = state.totalToPay - payload.price * payload.quantity;
    },
    addUnitToProduct: (state, { payload }) => {
      const { cartProduct, quantity } = payload;
      state.cart = state.cart.map((product) => {
        return product.id === cartProduct.id
          ? { ...product, quantity: cartProduct.quantity + quantity }
          : product;
      });
      state.totalItemsInCart = state.totalItemsInCart + quantity;
      state.totalToPay = state.totalToPay + cartProduct.price * quantity;
    },
    subtractUnitToProduct: (state, { payload }) => {
      const { cartProduct, quantity } = payload;
      state.cart = state.cart.map((product) => {
        return product.id === cartProduct.id
          ? { ...product, quantity: cartProduct.quantity - quantity }
          : product;
      });
      state.totalItemsInCart = state.totalItemsInCart - quantity;
      state.totalToPay = state.totalToPay - cartProduct.price * quantity;
    },
    clearCart: (state) => {
      state.isLoading = false;
      state.cart = [];
    },
  },
});

export const {
  isLoading,
  disabled,
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
