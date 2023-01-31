import { updateProduct } from "../../../src/store/products/productsSlice";
import { startLoadingProducts } from "../../../src/store/products/productsThunks";
import {
  addNewAddress,
  addNewCard,
  addNewPurchase,
  addProductToCart,
  addProductToFavorites,
  addUnitToProduct,
  clearActiveAddress,
  clearPaymentMethod,
  deleteAddress,
  deleteCard,
  deleteProductFromCart,
  deleteProductFromFavorites,
  isDisabled,
  isLoadingUserInfo,
  setAddresses,
  setCards,
  setCart,
  setFavorites,
  setPurchases,
  setTotalItemsInCart,
  setTotalToPay,
  subtractUnitToProduct,
  updatePurchase,
} from "../../../src/store/user/userSlice";
import {
  startAddingNewAddress,
  startAddingNewCard,
  startAddingNewPurchase,
  startAddingNewReview,
  startAddingProductToCart,
  startAddingProductToFavorites,
  startAddingUnitToProduct,
  startDeletingAddress,
  startDeletingCard,
  startDeletingProductFromCart,
  startDeletingProductFromFavorites,
  startLoadingUserInfo,
  startRemoveUnitToProduct,
} from "../../../src/store/user/userThunks";
import { testUser } from "../../fixtures/authFixtures";
import { updatedProduct } from "../../fixtures/productsFixtures";
import {
  cardsList,
  newAddress,
  newCard,
  newCartProduct,
  newFavoriteProduct,
  newPurchase,
  productsCartList,
} from "../../fixtures/userFixtures";

describe("Pruebas en userThunks.js", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("startLoadingUserInfo debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    getState.mockReturnValue({ auth: { uid: uid } });
    await startLoadingUserInfo()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(isLoadingUserInfo());
    expect(dispatch).toHaveBeenCalledWith(setCart(expect.any(Array)));
    expect(dispatch).toHaveBeenCalledWith(setFavorites(expect.any(Array)));
    expect(dispatch).toHaveBeenCalledWith(setAddresses(expect.any(Array)));
    expect(dispatch).toHaveBeenCalledWith(setCards(expect.any(Array)));
    expect(dispatch).toHaveBeenCalledWith(setPurchases(expect.any(Array)));
    expect(dispatch).toHaveBeenCalledWith(setTotalItemsInCart());
    expect(dispatch).toHaveBeenCalledWith(setTotalToPay());
  }, 20000);

  test("startAddingProductToFavorites debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    getState.mockReturnValue({ auth: { uid: uid } });
    await startAddingProductToFavorites(newFavoriteProduct)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      addProductToFavorites(newFavoriteProduct)
    );
  });

  test("startDeletingProductFromFavorites debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    getState.mockReturnValue({ auth: { uid: uid } });
    await startDeletingProductFromFavorites(newFavoriteProduct.id)(
      dispatch,
      getState
    );

    expect(dispatch).toHaveBeenCalledWith(
      deleteProductFromFavorites(newFavoriteProduct.id)
    );
  });

  test("startAddingProductToCart debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    getState.mockReturnValue({ auth: { uid: uid } });
    await startAddingProductToCart(newCartProduct)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(addProductToCart(newCartProduct));
    expect(dispatch).toHaveBeenCalledWith(setTotalItemsInCart());
    expect(dispatch).toHaveBeenCalledWith(setTotalToPay());
    expect(dispatch).toHaveBeenCalledWith(isDisabled());
  });

  test("startAddingUnitToProduct debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    getState.mockReturnValue({ auth: { uid: uid } });
    await startAddingUnitToProduct(newCartProduct)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(addUnitToProduct(newCartProduct));
    expect(dispatch).toHaveBeenCalledWith(setTotalItemsInCart());
    expect(dispatch).toHaveBeenCalledWith(setTotalToPay());
    expect(dispatch).toHaveBeenCalledWith(isDisabled());
  });

  test("startRemoveUnitToProduct debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    getState.mockReturnValue({ auth: { uid: uid } });
    await startRemoveUnitToProduct(newCartProduct)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      subtractUnitToProduct(newCartProduct)
    );
    expect(dispatch).toHaveBeenCalledWith(setTotalItemsInCart());
    expect(dispatch).toHaveBeenCalledWith(setTotalToPay());
    expect(dispatch).toHaveBeenCalledWith(isDisabled());
  });

  test("startDeletingProductFromCart debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    getState.mockReturnValue({ auth: { uid: uid } });
    await startDeletingProductFromCart(newCartProduct.id)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      deleteProductFromCart(newCartProduct.id)
    );
    expect(dispatch).toHaveBeenCalledWith(setTotalItemsInCart());
    expect(dispatch).toHaveBeenCalledWith(setTotalToPay());
  });

  test("startAddingNewAddress debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    getState.mockReturnValue({ auth: { uid: uid } });

    await startAddingNewAddress(newAddress)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(addNewAddress(newAddress));
  });

  test("startDeletingAddress debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    getState.mockReturnValue({ auth: { uid: uid } });

    await startDeletingAddress(newAddress.id)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(deleteAddress(newAddress.id));
  });

  test("startAddingNewCard debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    getState.mockReturnValue({ auth: { uid: uid } });

    await startAddingNewCard(newCard)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(addNewCard(newCard));
  });

  test("startDeletingCard debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    getState.mockReturnValue({ auth: { uid: uid } });

    await startDeletingCard(newCard.id)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(deleteCard(newCard.id));
  });

  test("startAddingNewPurchase debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    const cart = productsCartList;

    getState.mockReturnValue({ auth: { uid: uid }, user: { cart: cart } });

    await startAddingNewPurchase({
      purchase: newPurchase,
      product: updatedProduct,
    })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(updateProduct(updatedProduct));
    expect(dispatch).toHaveBeenCalledWith(addNewPurchase(newPurchase));
    expect(dispatch).toHaveBeenCalledWith(clearActiveAddress());
    expect(dispatch).toHaveBeenCalledWith(clearPaymentMethod());
  });

  test("startAddingNewReview debe de disparar las acciones que corresponde", async () => {
    const uid = testUser.uid;
    const cart = productsCartList;

    getState.mockReturnValue({ auth: { uid: uid }, user: { cart: cart } });

    await startAddingNewReview({
      purchase: newPurchase,
      product: updatedProduct,
    })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(updateProduct(updatedProduct));
    expect(dispatch).toHaveBeenCalledWith(updatePurchase(newPurchase));
    expect(dispatch).toHaveBeenCalledWith(isDisabled());
  });
});
