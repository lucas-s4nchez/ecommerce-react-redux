import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  favorites: [],
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
    addNewProductsToFavorites: (state, { payload }) => {
      state.favorites.push(payload);
    },
    deleteProductFromFavoritesById: (state, action) => {
      state.favorites = state.favorites.filter(
        (product) => product.id !== action.payload
      );
    },
    clearFavoritesOnLogout: (state) => {
      state.isLoading = false;
      state.favorites = [];
    },
  },
});

export const {
  isLoading,
  setFavorites,
  addNewProductsToFavorites,
  deleteProductFromFavoritesById,
  clearFavoritesOnLogout,
} = userSlice.actions;

export default userSlice.reducer;
