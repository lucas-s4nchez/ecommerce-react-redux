import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useProductsStore } from "../../src/hooks/useProductsStore";
import { productsSlice } from "../../src/store/products/productsSlice";
import { productsInitialState } from "../fixtures/productsFixtures";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      products: productsSlice.reducer,
    },
    preloadedState: {
      products: { ...initialState },
    },
  });
};

describe("Pruebas en el useProductsStore", () => {
  test("Debe de retornar los valores por defecto", () => {
    const mockStore = getMockStore({ ...productsInitialState });

    //Como renderizar un hook con un store de redux
    const { result } = renderHook(() => useProductsStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      isLoading: false,
      products: [],
      menProducts: [],
      womenProducts: [],
      kidProducts: [],
      featuredProducts: [],
      productsOnOffer: [],
      startLoadingProducts: expect.any(Function),
      startAddNewProduct: expect.any(Function),
    });
  });

  test("Debe de cargar los productos en el store correctamente", async () => {
    const mockStore = getMockStore({ ...productsInitialState });

    //Como renderizar un hook con un store de redux
    const { result } = renderHook(() => useProductsStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLoadingProducts();
    });

    expect(result.current.products.length).toBe(2);
  });
});
