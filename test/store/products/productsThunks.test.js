import {
  isLoading,
  setFeaturedProducts,
  setKidProducts,
  setMenProducts,
  setProducts,
  setProductsOnOffer,
  setWomenProducts,
} from "../../../src/store/products/productsSlice";
import { startLoadingProducts } from "../../../src/store/products/productsThunks";
import { productsStock } from "../../fixtures/productsFixtures";

describe('Pruebas en el archivo "productsThunks.js"', () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  test("'startLoadingProducts' debe disparar las acciones que cargan los productos en el estado de la app", async () => {
    await startLoadingProducts()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(isLoading());
    expect(dispatch).toHaveBeenCalledWith(setProducts(expect.any(Array)));
    expect(dispatch).toHaveBeenCalledWith(setMenProducts());
    expect(dispatch).toHaveBeenCalledWith(setWomenProducts());
    expect(dispatch).toHaveBeenCalledWith(setKidProducts());
    expect(dispatch).toHaveBeenCalledWith(setProductsOnOffer());
    expect(dispatch).toHaveBeenCalledWith(setFeaturedProducts());
  });
});
