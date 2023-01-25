import {
  addNewAddress,
  addNewCard,
  addNewPurchase,
  addProductToCart,
  addProductToFavorites,
  addUnitToProduct,
  clearActiveAddress,
  clearAddresses,
  clearCards,
  clearCart,
  clearFavorites,
  clearPaymentMethod,
  clearPurchases,
  confirmPayment,
  deleteAddress,
  deleteCard,
  deleteProductFromCart,
  deleteProductFromFavorites,
  disabled,
  isLoading,
  setActiveAddress,
  setAddresses,
  setCards,
  setCart,
  setFavorites,
  setPaymentMethod,
  setPurchases,
  subtractUnitToProduct,
  updatePurchase,
  userSlice,
} from "../../../src/store/user/index";
import {
  addressesList,
  addressesState,
  cardsList,
  cardsState,
  cartState,
  favoritesState,
  newAddress,
  newCard,
  newCartProduct,
  newFavoriteProduct,
  newPayment,
  newProduct,
  newPurchase,
  paymentMethodState,
  productsCartList,
  productsFavoritesList,
  productsList,
  purchasesList,
  purchasesState,
  totalItemsInCartTest,
  totalToPayTest,
  userInitialState,
} from "../../fixtures/userFixtures";

describe('Pruebas en el archivo "userSlice.js"', () => {
  test("El slice debe de tener el name 'user'", () => {
    const state = userSlice.reducer(userInitialState, {});

    expect(state).toEqual(userInitialState);
  });

  test('La propiedad "isLoading" del estado debe cambiar a "true"', () => {
    const state = userSlice.reducer(userInitialState, isLoading());

    expect(state.isLoading).toBe(true);
  });

  test('La propiedad "disabled" del estado debe cambiar a "true"', () => {
    const state = userSlice.reducer(userInitialState, disabled());

    expect(state.disabled).toBe(true);
  });

  test("Debe de cargar los productos favoritos", () => {
    const state = userSlice.reducer(
      userInitialState,
      setFavorites(productsFavoritesList)
    );

    expect(state.favorites).toEqual(productsFavoritesList);
  });

  test("Debe de añadir un producto a favoritos", () => {
    const state = userSlice.reducer(
      userInitialState,
      addProductToFavorites(newFavoriteProduct)
    );

    expect(state.favorites.length).toBe(1);
    expect(state.favorites[0]).toEqual(newFavoriteProduct);
  });

  test("Debe de eliminar un producto de favoritos", () => {
    const state = userSlice.reducer(
      favoritesState,
      deleteProductFromFavorites(3)
    );

    expect(state.favorites.length).toBe(2);
  });

  test("Debe de eliminar todos los productos de favoritos", () => {
    const state = userSlice.reducer(favoritesState, clearFavorites());

    expect(state.favorites).toEqual([]);
    expect(state.favorites.length).toBe(0);
  });

  test("Debe de cargar los productos al carrito, calcular el total y la cantidad de productos en el carrito", () => {
    const state = userSlice.reducer(
      userInitialState,
      setCart(productsCartList)
    );

    expect(state.cart).toEqual(productsCartList);
    expect(state.totalToPay).toBe(totalToPayTest);
    expect(state.totalItemsInCart).toBe(totalItemsInCartTest);
  });

  test("Debe de agregar un producto al carrito, calcular el total y la cantidad de productos en el carrito", () => {
    const state = userSlice.reducer(
      cartState,
      addProductToCart(newCartProduct)
    );

    expect(state.cart).toEqual([...productsCartList, newCartProduct]);
    expect(state.totalToPay).toBe(
      cartState.totalToPay + newCartProduct.price * newCartProduct.quantity
    );
    expect(state.totalItemsInCart).toBe(
      cartState.totalItemsInCart + newCartProduct.quantity
    );
  });

  test("Debe de eliminar un producto del carrito, calcular el total y la cantidad de productos en el carrito", () => {
    //agrego un producto para luego eliminarlo
    const newCartState = {
      ...cartState,
      cart: [...cartState.cart, newCartProduct],
      totalItemsInCart: cartState.totalItemsInCart + newCartProduct.quantity,
      totalToPay:
        cartState.totalToPay + newCartProduct.quantity * newCartProduct.price,
    };
    const state = userSlice.reducer(
      newCartState,
      deleteProductFromCart(newCartProduct)
    );

    expect(state.cart).toEqual([...productsCartList]);
    expect(state.totalToPay).toBe(totalToPayTest);
    expect(state.totalItemsInCart).toBe(totalItemsInCartTest);
  });

  test("Debe de agregar una unidad a un producto del carrito, calcular el total y la cantidad de productos en el carrito", () => {
    //agrego un producto para luego agregar una unidad a este
    const newCartState = {
      ...cartState,
      cart: [...cartState.cart, newCartProduct],
      totalItemsInCart: cartState.totalItemsInCart + newCartProduct.quantity,
      totalToPay:
        cartState.totalToPay + newCartProduct.quantity * newCartProduct.price,
    };
    const state = userSlice.reducer(
      newCartState,
      addUnitToProduct({ cartProduct: newCartProduct, quantity: 1 })
    );

    expect(state.cart).toEqual([
      ...cartState.cart,
      { ...newCartProduct, quantity: newCartProduct.quantity + 1 },
    ]);
    expect(state.totalToPay).toBe(
      newCartState.totalToPay + newCartProduct.price * newCartProduct.quantity
    );
    expect(state.totalItemsInCart).toBe(
      newCartState.totalItemsInCart + newCartProduct.quantity
    );
  });

  test("Debe de restar una unidad a un producto del carrito, calcular el total y la cantidad de productos en el carrito", () => {
    //agrego un producto con varias unidades para luego restar una unidad a este
    const newCartProductTest = { ...newCartProduct, quantity: 3 };
    const newCartState = {
      ...cartState,
      cart: [...cartState.cart, newCartProductTest],
      totalItemsInCart:
        cartState.totalItemsInCart + newCartProductTest.quantity,
      totalToPay:
        cartState.totalToPay +
        newCartProductTest.quantity * newCartProductTest.price,
    };
    const state = userSlice.reducer(
      newCartState,
      subtractUnitToProduct({ cartProduct: newCartProductTest, quantity: 1 })
    );

    expect(state.cart).toEqual([
      ...cartState.cart,
      { ...newCartProductTest, quantity: newCartProductTest.quantity - 1 },
    ]);
    expect(state.totalToPay).toBe(
      newCartState.totalToPay - newCartProductTest.price * 1
    );
    expect(state.totalItemsInCart).toBe(newCartState.totalItemsInCart - 1);
  });

  test("Debe de eliminar todos los productos del carrito", () => {
    const state = userSlice.reducer(cartState, clearCart());

    expect(state.cart).toEqual([]);
    expect(state.cart.length).toBe(0);
  });

  test("Debe de cargar las direcciones del usuario", () => {
    const state = userSlice.reducer(
      userInitialState,
      setAddresses(addressesList)
    );

    expect(state.addresses).toEqual(addressesList);
  });

  test("Debe de agregar una nueva dirección ", () => {
    const state = userSlice.reducer(addressesState, addNewAddress(newAddress));

    expect(state.addresses.length).toBe(3);
  });

  test("Debe de eliminar una dirección", () => {
    const state = userSlice.reducer(
      addressesState,
      deleteAddress({
        id: 1,
        city: "Milagro",
        fullName: "Dmitri Klokov",
        phoneNumber: "8759869",
        postalCode: "1233",
        province: "Buenos Aires",
        street: "San Martín",
        streetNumber: "36",
      })
    );

    expect(state.addresses.length).toBe(1);
  });

  test("Debe de eliminar todas las direcciones", () => {
    const state = userSlice.reducer(addressesState, clearAddresses());

    expect(state.addresses.length).toBe(0);
  });

  test("Debe de establecer una direccion activa", () => {
    const state = userSlice.reducer(
      addressesState,
      setActiveAddress(newAddress)
    );

    expect(state.activeAddress).toEqual(newAddress);
  });

  test("Debe de eliminar la direccion activa", () => {
    const newState = {
      ...userInitialState,
      activeAddress: { ...newAddress },
    };
    const state = userSlice.reducer(newState, clearActiveAddress());

    expect(state.activeAddress).toBe(null);
  });

  test("Debe de cargar las tarjetas del usuario", () => {
    const state = userSlice.reducer(userInitialState, setCards(cardsList));

    expect(state.cards).toEqual(cardsList);
  });

  test("Debe de agregar una nueva tarjeta", () => {
    const state = userSlice.reducer(cardsState, addNewCard(newCard));

    expect(state.cards.length).toBe(3);
  });

  test("Debe de eliminar una tarjeta", () => {
    const state = userSlice.reducer(
      cardsState,
      deleteCard({
        id: 1,
        cvc: "545",
        expiryMonth: 8,
        expiryYear: 28,
        name: "Maria elena fuseneco",
        number: "4584845241649845",
      })
    );

    expect(state.cards.length).toBe(1);
  });

  test("Debe de eliminar todas las tarjetas", () => {
    const state = userSlice.reducer(cardsState, clearCards());

    expect(state.cards.length).toBe(0);
  });

  test("Debe de establecer el método de pago", () => {
    const state = userSlice.reducer(
      userInitialState,
      setPaymentMethod(newPayment)
    );

    expect(state.paymentMethod).toEqual(newPayment);
  });

  test("Debe de borrar el método de pago actual", () => {
    const state = userSlice.reducer(paymentMethodState, clearPaymentMethod());

    expect(state.paymentMethod).toBe(null);
  });

  test("Debe de borrar la dirección activa y el método de pago al confirmar una compra", () => {
    const state = userSlice.reducer(userInitialState, confirmPayment());

    expect(state.activeAddress).toBe(null);
    expect(state.paymentMethod).toBe(null);
  });

  test("Debe de cargar las compras del usuario", () => {
    const state = userSlice.reducer(
      userInitialState,
      setPurchases(purchasesList)
    );

    expect(state.purchases).toEqual(purchasesList);
  });

  test("Debe de añadir una nueva compra", () => {
    const state = userSlice.reducer(
      userInitialState,
      addNewPurchase(newPurchase)
    );

    expect(state.purchases.length).toBe(1);
  });

  test("Debe de actualizar una compra", () => {
    const state = userSlice.reducer(
      purchasesState,
      updatePurchase({
        purchaseId: 2,
        purchase: {
          brand: "Nike",
          colors: ["negro", "rojo"],
          image: "https://image2.com",
          model: "Air Max",
          price: 20000,
          productId: "joisadoasidhos",
          quantity: 1,
          size: 44,
          version: 2.0,
          waitingToReceiveRating: false,
        },
      })
    );

    //El segundo item debe cambiar
    expect(state.purchases[1].waitingToReceiveRating).toBe(false);
  });

  test("Debe de eliminar todas las compras", () => {
    const state = userSlice.reducer(purchasesState, clearPurchases());

    expect(state.purchases.length).toBe(0);
  });
});
