import {
  isLoadingProducts,
  setProducts,
} from "../../../src/store/products/productsSlice";
import { startLoadingProducts } from "../../../src/store/products/productsThunks";
describe("Pruebas en productsThunks", () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("startLoadingProducts debe de disparar las acciones que corresponde", async () => {
    await startLoadingProducts()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setProducts(expect.any(Array)));
    expect(dispatch).toHaveBeenCalledWith(isLoadingProducts());
  });
});
