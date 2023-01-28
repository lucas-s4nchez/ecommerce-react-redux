import {
  isLoadingProducts,
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
    const state = productsSlice.reducer(
      productsInitialState,
      isLoadingProducts()
    );

    expect(state.isLoading).toBe(true);
  });

  test("Debe de cargar los productos", () => {
    const state = productsSlice.reducer(
      productsInitialState,
      setProducts(productsStock)
    );

    expect(state).toEqual(productsLoadedState);
    expect(state.products.length).toBe(2);
  });

  test("Debe de actualizar un producto", () => {
    const newProductId = "4hekghyh5jgwMcImmKPQ";
    const state = productsSlice.reducer(
      productsLoadedState,
      updateProduct({ productId: newProductId, product: updatedProduct })
    );
    const currentProduct = {
      ...state.products.find((product) => product.id === newProductId),
    };
    delete currentProduct.id;

    expect(currentProduct).toEqual(updatedProduct);
  });

  test("Debe de cargar los productos de hombres", () => {
    const state = productsSlice.reducer(productsLoadedState, setMenProducts());

    expect(state.menProducts.length).toBe(1);
  });

  test("Debe de cargar los productos de mujeres", () => {
    const state = productsSlice.reducer(
      productsLoadedState,
      setWomenProducts()
    );

    expect(state.womenProducts.length).toBe(1);
  });

  test("Debe de cargar los productos de niños", () => {
    const state = productsSlice.reducer(productsLoadedState, setKidProducts());

    expect(state.kidProducts.length).toBe(0);
  });

  test("Debe de cargar los productos destacados", () => {
    const state = productsSlice.reducer(
      productsLoadedState,
      setFeaturedProducts()
    );

    expect(state.featuredProducts.length).toBe(1);
  });

  test("Debe de cargar los productos en oferta", () => {
    const state = productsSlice.reducer(
      productsLoadedState,
      setProductsOnOffer()
    );

    expect(state.productsOnOffer.length).toBe(1);
  });
});
