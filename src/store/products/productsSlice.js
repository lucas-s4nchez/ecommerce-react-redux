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

    updateProduct: (state, { payload }) => {
      state.products = state.products.map((product) => {
        if (product.id === payload.productId) {
          return { id: payload.productId, ...payload.product };
        } else {
          return product;
        }
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
  isLoading,
  setProducts,
  setMenProducts,
  setWomenProducts,
  setKidProducts,
  setFeaturedProducts,
  setProductsOnOffer,
  updateProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
