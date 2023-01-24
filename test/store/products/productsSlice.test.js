import {
  isLoading,
  productsSlice,
  setFeaturedProducts,
  setKidProducts,
  setMenProducts,
  setProducts,
  setProductsOnOffer,
  setWomenProducts,
  updateProduct,
} from "../../../src/store/products/index";
import {
  productsInitialState,
  productsLoadedState,
  productsStock,
  updatedProduct,
} from "../../fixtures/productsFixtures";

describe('Pruebas en el archivo "productsSlice.js"', () => {
  test('El slice debe tener el name "products"', () => {
    const stateName = productsSlice.name;

    expect(stateName).toBe("products");
  });

  test("Debe de retornar el estado inicial", () => {
    const state = productsSlice.reducer(productsInitialState, {});

    expect(state).toEqual(productsInitialState);
  });

  test('La propiedad "isLoading" debe pasar a true al disparar la accion', () => {
    const state = productsSlice.reducer(productsInitialState, isLoading());

    expect(state.isLoading).toBe(true);
  });

  test("Debe de cargar los productos", () => {
    const state = productsSlice.reducer(
      productsInitialState,
      setProducts(productsStock)
    );

    expect(state.products).toEqual(productsStock);
  });

  test("Debe de actualizar un producto", () => {
    const state = productsSlice.reducer(
      productsLoadedState,
      updateProduct({ productId: 2, product: updatedProduct })
    );
    const findProductUpdated = {
      ...state.products.find((product) => product.id === 2),
    };
    delete findProductUpdated.id;

    expect(findProductUpdated).toEqual(updatedProduct);
  });

  test("Debe de cargar los productos de hombres", () => {
    const state = productsSlice.reducer(productsLoadedState, setMenProducts());

    expect(state.menProducts.length).toBe(2);
  });

  test("Debe de cargar los productos de mujeres", () => {
    const state = productsSlice.reducer(
      productsLoadedState,
      setWomenProducts()
    );

    expect(state.womenProducts.length).toBe(2);
  });

  test("Debe de cargar los productos de niños", () => {
    const state = productsSlice.reducer(productsLoadedState, setKidProducts());

    expect(state.kidProducts.length).toBe(1);
  });

  test("Debe de cargar los productos destacados", () => {
    const state = productsSlice.reducer(
      productsLoadedState,
      setFeaturedProducts()
    );

    expect(state.featuredProducts.length).toBe(2);
  });

  test("Debe de cargar los productos en oferta", () => {
    const state = productsSlice.reducer(
      productsLoadedState,
      setProductsOnOffer()
    );

    expect(state.productsOnOffer.length).toBe(2);
  });
});
