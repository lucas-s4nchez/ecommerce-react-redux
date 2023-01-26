// import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
// import { FirebaseDB } from "../../../src/firebase/config";
// import { updateProduct } from "../../../src/store/products/productsSlice";
// import { startLoadingProducts } from "../../../src/store/products/productsThunks";
// import {
//   addNewAddress,
//   addNewCard,
//   addNewPurchase,
//   addProductToCart,
//   addProductToFavorites,
//   addUnitToProduct,
//   clearActiveAddress,
//   clearFavorites,
//   clearPaymentMethod,
//   deleteCard,
//   deleteProductFromCart,
//   disabled,
//   isLoading,
//   setAddresses,
//   setCards,
//   setCart,
//   setFavorites,
//   setPurchases,
//   subtractUnitToProduct,
//   updatePurchase,
// } from "../../../src/store/user/userSlice";
// import {
//   startAddingNewAddress,
//   startAddingNewCard,
//   startAddingNewPurchase,
//   startAddingNewReview,
//   startAddingProductToCart,
//   startAddingProductToFavorites,
//   startAddingUnitToProduct,
//   startDeletingAddress,
//   startDeletingAllProductsFromFavorites,
//   startDeletingCard,
//   startDeletingProductFromCart,
//   startDeletingProductFromFavorites,
//   startLoadingUserInfo,
//   startRemoveUnitToProduct,
// } from "../../../src/store/user/userThunks";
// import {
//   newAddress,
//   newCard,
//   newFavoriteProduct,
//   newFavoriteProductFirebase,
//   productsFirebase,
// } from "../../fixtures/userFixtures";

// describe('Pruebas en el archivo "userThunks.js"', () => {
//   const dispatch = jest.fn();
//   const getState = jest.fn();
//   beforeEach(() => jest.clearAllMocks());
//   test("should ", () => {});
//   // test("'startLoadingUserInfo' dispara todas las acciones que cargan toda la información del usuario ", async () => {
//   //   const uid = "TEST-ID";
//   //   getState.mockReturnValue({ auth: { uid: uid } });

//   //   await startLoadingUserInfo()(dispatch, getState);

//   //   expect(dispatch).toHaveBeenCalledWith(isLoading());
//   //   expect(dispatch).toHaveBeenCalledWith(setCart(expect.any(Array)));
//   //   expect(dispatch).toHaveBeenCalledWith(setFavorites(expect.any(Array)));
//   //   expect(dispatch).toHaveBeenCalledWith(setAddresses(expect.any(Array)));
//   //   expect(dispatch).toHaveBeenCalledWith(setCards(expect.any(Array)));
//   //   expect(dispatch).toHaveBeenCalledWith(setPurchases(expect.any(Array)));
//   // }, 20000);

//   // test("'startAddingProductToFavorites' dispara la accion 'addProductToFavorites' ", async () => {
//   //   const uid = "TEST-ID";
//   //   const productId = newFavoriteProductFirebase.id;

//   //   getState.mockReturnValue({
//   //     auth: { uid: uid },
//   //     products: { products: productsFirebase },
//   //   });

//   //   await startAddingProductToFavorites(productId)(dispatch, getState);

//   //   expect(dispatch).toHaveBeenCalledWith(
//   //     addProductToFavorites(expect.any(Object))
//   //   );
//   //   //borrar los favoritos de firebase
//   //   const collectionRef = collection(FirebaseDB, `users/${uid}/favorites`);
//   //   const docs = await getDocs(collectionRef);

//   //   const deletePromises = [];
//   //   docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
//   //   await Promise.all(deletePromises);
//   // }, 10000);

//   // test("'startDeletingProductFromFavorites' dispara la accion 'deleteProductFromFavorites'", async () => {
//   //   const uid = "TEST-ID";
//   //   const productId = newFavoriteProductFirebase.id;

//   //   getState.mockReturnValue({
//   //     auth: { uid: uid },
//   //     products: { products: productsFirebase },
//   //   });
//   //   //agrego uno
//   //   await startAddingProductToFavorites(productId)(dispatch, getState);
//   //   //lo elimino
//   //   await startDeletingProductFromFavorites(productId, productId)(
//   //     dispatch,
//   //     getState
//   //   );
//   // });

//   // test("'startDeletingAllProductsFromFavorites' dispara la accion 'clearFavorites'", async () => {
//   //   const uid = "TEST-ID";
//   //   const favorites = [];

//   //   getState.mockReturnValue({
//   //     auth: { uid: uid },
//   //     user: { favorites: favorites },
//   //   });
//   //   await startDeletingAllProductsFromFavorites()(dispatch, getState);

//   //   expect(dispatch).toHaveBeenCalledWith(clearFavorites());
//   // });

//   // test("'startAddingProductToCart' dispara la accion 'addProductToCart'", async () => {
//   //   const uid = "TEST-ID";
//   //   const productId = newFavoriteProductFirebase.id;

//   //   getState.mockReturnValue({
//   //     auth: { uid: uid },
//   //     products: { products: productsFirebase },
//   //   });

//   //   //id, cantidad, talle
//   //   await startAddingProductToCart(productId, 1, 44)(dispatch, getState);

//   //   expect(dispatch).toHaveBeenCalledWith(addProductToCart(expect.any(Object)));
//   // });

//   //Debe de existir un producto en 'cart' en firebase, para obtener el id para que el test funcione
//   // test("'startAddingUnitToProduct' dispara las acciones 'addUnitToProduct' y 'disabled'", async () => {
//   //   const uid = "TEST-ID";
//   //   const cart = [{ id: "qb0Bl20K8xWm1zO4y9sd", quantity: 1, size: 44 }];
//   //   getState.mockReturnValue({
//   //     auth: { uid: uid },
//   //     user: { cart: cart },
//   //   });
//   //   //id, cantidad, talle
//   //   await startAddingUnitToProduct(
//   //     "qb0Bl20K8xWm1zO4y9sd",
//   //     1,
//   //     44
//   //   )(dispatch, getState);

//   //   expect(dispatch).toHaveBeenCalledWith(addUnitToProduct(expect.any(Object)));
//   //   expect(dispatch).toHaveBeenCalledWith(disabled());
//   // });

//   //Debe de existir un producto en 'cart' en firebase, para obtener el id para que el test funcione
//   // test("'startRemoveUnitToProduct' dispara las acciones 'subtractUnitToProduct' y 'disabled'", async () => {
//   //   const uid = "TEST-ID";
//   //   const cart = [{ id: "qb0Bl20K8xWm1zO4y9sd", quantity: 2, size: 44 }];
//   //   getState.mockReturnValue({
//   //     auth: { uid: uid },
//   //     user: { cart: cart },
//   //   });
//   //   //id, cantidad, talle
//   //   await startRemoveUnitToProduct(
//   //     "qb0Bl20K8xWm1zO4y9sd",
//   //     1,
//   //     44
//   //   )(dispatch, getState);

//   //   expect(dispatch).toHaveBeenCalledWith(
//   //     subtractUnitToProduct(expect.any(Object))
//   //   );
//   //   expect(dispatch).toHaveBeenCalledWith(disabled());
//   // });

//   //Debe de existir un producto en 'cart' en firebase, para obtener el id para que el test funcione
//   // test("'startDeletingProductFromCart' dispara la accion 'deleteProductFromCart'", async () => {
//   //   const uid = "TEST-ID";
//   //   const cart = [{ id: "rBJqWcCrZLuiCJrKZlU7", quantity: 2, size: 44 }];
//   //   getState.mockReturnValue({
//   //     auth: { uid: uid },
//   //     user: { cart: cart },
//   //   });

//   //   await startDeletingProductFromCart("rBJqWcCrZLuiCJrKZlU7")(
//   //     dispatch,
//   //     getState
//   //   );

//   //   expect(dispatch).toHaveBeenCalledWith(
//   //     deleteProductFromCart(expect.any(Object))
//   //   );
//   // });

//   // test("'startAddingNewAddress' dispara la accion 'addNewAddress'", async () => {
//   //   const uid = "TEST-ID";
//   //   const addressFirebase = { ...newAddress };
//   //   delete addressFirebase.id;
//   //   getState.mockReturnValue({ auth: { uid: uid } });

//   //   await startAddingNewAddress(addressFirebase)(dispatch, getState);

//   //   expect(dispatch).toHaveBeenCalledWith(addNewAddress(expect.any(Object)));
//   // });

//   //Debe de existir una direccion en 'addresses' en firebase para obtener el id
//   // test("'startDeletingAddress' dispara la accion 'deleteAddress'", async () => {
//   //   const uid = "TEST-ID";
//   //   const addresses = [{ id: "qXhZAD1IGAbnihXZuxGs" }];
//   //   getState.mockReturnValue({
//   //     auth: { uid: uid },
//   //     user: { addresses: addresses },
//   //   });

//   //   await startDeletingAddress("qXhZAD1IGAbnihXZuxGs")(dispatch, getState);

//   //   expect(dispatch).toHaveBeenCalledWith(deleteAddress(expect.any(Object)));
//   // });

//   // test("'startAddingNewCard' dispara la accion 'addNewCard'", async () => {
//   //   const uid = "TEST-ID";
//   //   const cardFirebase = { ...newCard };
//   //   delete cardFirebase.id;
//   //   getState.mockReturnValue({ auth: { uid: uid } });

//   //   await startAddingNewCard(cardFirebase)(dispatch, getState);

//   //   expect(dispatch).toHaveBeenCalledWith(addNewCard(expect.any(Object)));
//   // });

//   //Debe de existir una tarjeta en 'cards' en firebase para obtener el id
//   // test("'startDeletingCard' dispara la accion 'deleteCard'", async () => {
//   //   const uid = "TEST-ID";
//   //   const cards = [{ id: "Uk56MwLZRhGHnsbxwiLn" }];
//   //   getState.mockReturnValue({
//   //     auth: { uid: uid },
//   //     user: { cards: cards },
//   //   });

//   //   await startDeletingCard("Uk56MwLZRhGHnsbxwiLn")(dispatch, getState);

//   //   expect(dispatch).toHaveBeenCalledWith(deleteCard(expect.any(Object)));
//   // });

//   // test("'startAddingNewPurchase' dispara las acciones 'addNewPurchase', 'updateProduct', 'clearPaymentMethod' y 'clearActiveAddress'", async () => {
//   //   const uid = "TEST-ID";
//   //   const cart = [];

//   //   getState.mockReturnValue({
//   //     auth: { uid: uid },
//   //     products: { products: productsFirebase },
//   //     user: { cart: cart },
//   //   });

//   //   await startAddingNewPurchase({
//   //     productId: "4hekghyh5jgwMcImmKPQ",
//   //     quantity: 1,
//   //     waitingToReceiveRating: true,
//   //   })(dispatch, getState);

//   //   expect(dispatch).toHaveBeenCalledWith(addNewPurchase(expect.any(Object)));
//   //   expect(dispatch).toHaveBeenCalledWith(updateProduct(expect.any(Object)));
//   //   expect(dispatch).toHaveBeenCalledWith(clearActiveAddress());
//   //   expect(dispatch).toHaveBeenCalledWith(clearPaymentMethod());
//   // });

//   // test("'startAddingNewReview' dispara las acciones 'updateProduct', 'updatePurchase', 'disabled' y 'startLoadingProducts' ", async () => {
//   //   const uid = "TEST-ID";
//   //   const purchases = [];
//   //   const item = {
//   //     id: "4hekghyh5jgwMcImmKPQ",
//   //     comment: "Hermosas!",
//   //     rating: 4,
//   //     date: 108373978376,
//   //     userName: "Klokov",
//   //     purchaseId: "PkXNwaDF5wlR6ClnbpFl",
//   //   };

//   //   getState.mockReturnValue({
//   //     auth: { uid: uid },
//   //     products: { products: productsFirebase },
//   //     user: { purchases: purchases },
//   //   });

//   //   await startAddingNewReview(item)(dispatch, getState);

//   //   expect(dispatch).toHaveBeenCalledWith(updateProduct(expect.any(Object)));
//   //   expect(dispatch).toHaveBeenCalledWith(updatePurchase(expect.any(Object)));
//   //   expect(dispatch).toHaveBeenCalledWith(disabled());
//   // });
// });
