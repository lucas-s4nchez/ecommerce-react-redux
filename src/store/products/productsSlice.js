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

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    isLoadingProducts: (state) => {
      state.isLoading = !state.isLoading;
    },
    setProducts: (state, { payload }) => {
      state.products = payload;
    },

    updateProduct: (state, { payload }) => {
      state.products = state.products.map((product) => {
        return product.id === payload.id ? { ...payload } : product;
      });
    },
    setMenProducts: (state) => {
      state.menProducts = state.products.filter(
        (product) => product.gender === "Hombre"
      );
    },
    setWomenProducts: (state) => {
      state.womenProducts = state.products.filter(
        (product) => product.gender === "Mujer"
      );
    },
    setKidProducts: (state) => {
      state.kidProducts = state.products.filter(
        (product) => product.gender === "Niños"
      );
    },
    setFeaturedProducts: (state) => {
      state.featuredProducts = state.products.filter(
        (product) => product.featured === true
      );
    },
    setProductsOnOffer: (state) => {
      state.productsOnOffer = state.products.filter(
        (product) => product.discount > 0
      );
    },
  },
});

export const {
  isLoadingProducts,
  setProducts,
  setMenProducts,
  setWomenProducts,
  setKidProducts,
  setFeaturedProducts,
  setProductsOnOffer,
  updateProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
