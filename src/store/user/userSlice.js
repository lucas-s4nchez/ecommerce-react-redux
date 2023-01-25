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
} = userSlice.actions;

export default userSlice.reducer;
