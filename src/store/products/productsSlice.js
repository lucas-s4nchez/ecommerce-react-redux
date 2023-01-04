import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  menProducts: [],
  womenProducts: [],
  kidProducts: [],
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
    setMenProducts: (state, { payload }) => {
      state.menProducts = payload;
    },
    setWomenProducts: (state, { payload }) => {
      state.womenProducts = payload;
    },
    setKidProducts: (state, { payload }) => {
      state.kidProducts = payload;
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
  setMenProducts,
  setWomenProducts,
  setKidProducts,
  setFeaturedProducts,
  setProductsOnOffer,
} = productsSlice.actions;

export default productsSlice.reducer;
