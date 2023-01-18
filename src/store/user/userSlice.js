import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  disabled: false,
  favorites: [],
  cart: [],
  totalItemsInCart: 0,
  totalToPay: 0,
  addresses: [],
  cards: [],
  activeCard: null,
  activeAddress: null,
  paymentMethod: null,
  // isSavingAddress: false,
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
    setAddresses: (state, { payload }) => {
      state.addresses = payload;
    },
    addNewAddress: (state, { payload }) => {
      state.addresses.push(payload);
    },
    setActiveAddress: (state, { payload }) => {
      state.activeAddress = payload;
    },
    setCards: (state, { payload }) => {
      state.cards = payload;
    },
    addNewCard: (state, { payload }) => {
      state.cards.push(payload);
    },
    setActiveCard: (state, { payload }) => {
      state.activeCard = payload;
    },
    setPaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
    confirmPayment: (state) => {
      state.activeCard = null;
      state.paymentMethod = null;
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
  setAddresses,
  addNewAddress,
  setActiveAddress,
  setCards,
  addNewCard,
  setActiveCard,
  setPaymentMethod,
  confirmPayment,
} = userSlice.actions;

export default userSlice.reducer;
