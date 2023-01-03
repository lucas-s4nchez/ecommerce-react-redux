import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  featuredProducts: [],
  productsOnOffer: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    isLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
    setFeaturedProducts: (state, { payload }) => {
      state.featuredProducts = payload;
    },
    setProductsOnOffer: (state, { payload }) => {
      state.productsOnOffer = payload;
    },
  },
});

export const {
  isLoading,
  setProducts,
  setFeaturedProducts,
  setProductsOnOffer,
} = productsSlice.actions;

export default productsSlice.reducer;
