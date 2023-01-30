import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  disabled: false,
  favorites: [],
  cart: [],
  purchases: [],
  totalItemsInCart: 0,
  totalToPay: 0,
  addresses: [],
  cards: [],
  activeAddress: null,
  paymentMethod: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLoadingUserInfo: (state) => {
      state.isLoading = !state.isLoading;
    },
    isDisabled: (state) => {
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
    },
    addProductToCart: (state, { payload }) => {
      state.cart.push(payload);
    },
    deleteProductFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((product) => product.id !== payload);
    },
    addUnitToProduct: (state, { payload }) => {
      state.cart = state.cart.map((product) => {
        return product.id === payload.id ? payload : product;
      });
    },
    subtractUnitToProduct: (state, { payload }) => {
      state.cart = state.cart.map((product) => {
        return product.id === payload.id ? payload : product;
      });
    },
    setTotalToPay: (state) => {
      state.totalToPay = state.cart.reduce(
        (acc, curr) => acc + curr.quantity * curr.price,
        0
      );
    },
    setTotalItemsInCart: (state) => {
      state.totalItemsInCart = state.cart.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.isLoading = false;
      state.cart = [];
      state.totalItemsInCart = 0;
      state.totalToPay = 0;
    },
    setAddresses: (state, { payload }) => {
      state.addresses = payload;
    },
    addNewAddress: (state, { payload }) => {
      state.addresses.push(payload);
    },
    deleteAddress: (state, { payload }) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== payload.id
      );
    },
    setActiveAddress: (state, { payload }) => {
      state.activeAddress = payload;
    },
    clearActiveAddress: (state) => {
      state.activeAddress = null;
    },
    clearAddresses: (state) => {
      state.addresses = [];
    },
    setCards: (state, { payload }) => {
      state.cards = payload;
    },
    addNewCard: (state, { payload }) => {
      state.cards.push(payload);
    },
    deleteCard: (state, { payload }) => {
      state.cards = state.cards.filter((card) => card.id !== payload.id);
    },
    clearCards: (state) => {
      state.cards = [];
    },
    setPaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
    clearPaymentMethod: (state) => {
      state.paymentMethod = null;
    },
    confirmPayment: (state) => {
      state.activeCard = null;
      state.paymentMethod = null;
    },
    setPurchases: (state, { payload }) => {
      state.purchases = payload;
    },
    addNewPurchase: (state, { payload }) => {
      state.purchases.push(payload);
    },
    updatePurchase: (state, { payload }) => {
      state.purchases = state.purchases.map((item) => {
        if (item.id === payload.purchaseId) {
          return { id: payload.purchaseId, ...payload.purchase };
        } else {
          return item;
        }
      });
    },
    clearPurchases: (state) => {
      state.purchases = [];
    },
    clearUserInfo: (state) => {
      state.isLoading = false;
      state.disabled = false;
      state.favorites = [];
      state.cart = [];
      state.purchases = [];
      state.totalItemsInCart = 0;
      state.totalToPay = 0;
      state.addresses = [];
      state.cards = [];
      state.activeAddress = null;
      state.paymentMethod = null;
    },
  },
});

export const {
  isLoadingUserInfo,
  isDisabled,
  setFavorites,
  addProductToFavorites,
  deleteProductFromFavorites,
  clearFavorites,
  setCart,
  addProductToCart,
  deleteProductFromCart,
  addUnitToProduct,
  subtractUnitToProduct,
  setTotalItemsInCart,
  setTotalToPay,
  clearCart,
  setAddresses,
  addNewAddress,
  deleteAddress,
  setActiveAddress,
  clearAddresses,
  clearActiveAddress,
  setCards,
  addNewCard,
  deleteCard,
  clearCards,
  setPaymentMethod,
  confirmPayment,
  setPurchases,
  addNewPurchase,
  updatePurchase,
  clearPurchases,
  clearPaymentMethod,
  clearUserInfo,
} = userSlice.actions;

export default userSlice.reducer;
