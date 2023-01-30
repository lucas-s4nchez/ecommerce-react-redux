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
  isDisabled,
  isLoadingUserInfo,
  setActiveAddress,
  setAddresses,
  setCards,
  setCart,
  setFavorites,
  setPaymentMethod,
  setPurchases,
  setTotalItemsInCart,
  setTotalToPay,
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
  newPurchase,
  paymentMethodState,
  productsCartList,
  productsFavoritesList,
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
  test("Debe de retornar el estado inicial", () => {
    const state = userSlice.reducer(userInitialState, {});

    expect(state).toEqual(userInitialState);
  });

  test('La propiedad "isLoading" del estado debe cambiar a "true"', () => {
    const state = userSlice.reducer(userInitialState, isLoadingUserInfo());

    expect(state.isLoading).toBe(true);
  });

  test('La propiedad "disabled" del estado debe cambiar a "true"', () => {
    const state = userSlice.reducer(userInitialState, isDisabled());

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
    const productId = 3;
    const state = userSlice.reducer(
      favoritesState,
      deleteProductFromFavorites(productId)
    );

    expect(state.favorites.length).toBe(2);
  });

  test("Debe de eliminar todos los productos de favoritos", () => {
    const state = userSlice.reducer(favoritesState, clearFavorites());

    expect(state.favorites).toEqual([]);
    expect(state.favorites.length).toBe(0);
  });

  test("Debe de cargar los productos al carrito", () => {
    const state = userSlice.reducer(
      userInitialState,
      setCart(productsCartList)
    );

    expect(state.cart).toEqual(productsCartList);
  });

  test("Debe de agregar un producto al carrito", () => {
    const state = userSlice.reducer(
      userInitialState,
      addProductToCart(newCartProduct)
    );

    expect(state.cart).toEqual([newCartProduct]);
    expect(state.cart.length).toBe(1);
  });

  test("Debe de eliminar un producto del carrito", () => {
    const productId = 3;
    const state = userSlice.reducer(cartState, deleteProductFromCart(3));

    expect(state.cart).toEqual(
      productsCartList.filter((p) => p.id !== productId)
    );
    expect(state.cart.length).toBe(2);
  });

  test("Debe de agregar una unidad a un producto del carrito", () => {
    const newCartProduct = {
      id: 3,
      brand: "Fila",
      model: "Trend",
      version: "2.0",
      gender: "Mujer",
      adjustment: "Slip-on, Cordones",
      price: 15500,
      style: "Deportivo",
      exterior: "Poliéster",
      sole: "Goma EVA",
      colors: ["negro", "rojo"],
      images: [
        "https://i.ibb.co/XXrRLmF/trend-1.webp",
        "https://i.ibb.co/Ctj7Cy0/trend-2.webp",
        "https://i.ibb.co/jkvfnMK/trend-3.webp",
        "https://i.ibb.co/Sr1vhPX/trend-4.webp",
      ],
      sizes: [35, 39, 40],
      stock: 50,
      discount: 0,
      quantity: 4,
      featured: true,
      reviews: [],
      sold: 0,
    };
    const state = userSlice.reducer(
      cartState,
      addUnitToProduct(newCartProduct)
    );

    //originalmente la cantidad era 2
    expect(state.cart[0].quantity).toBe(4);
  });

  test("Debe de restar una unidad a un producto del carrito", () => {
    const newCartProduct = {
      id: 3,
      brand: "Fila",
      model: "Trend",
      version: "2.0",
      gender: "Mujer",
      adjustment: "Slip-on, Cordones",
      price: 15500,
      style: "Deportivo",
      exterior: "Poliéster",
      sole: "Goma EVA",
      colors: ["negro", "rojo"],
      images: [
        "https://i.ibb.co/XXrRLmF/trend-1.webp",
        "https://i.ibb.co/Ctj7Cy0/trend-2.webp",
        "https://i.ibb.co/jkvfnMK/trend-3.webp",
        "https://i.ibb.co/Sr1vhPX/trend-4.webp",
      ],
      sizes: [35, 39, 40],
      stock: 50,
      discount: 0,
      quantity: 1,
      featured: true,
      reviews: [],
      sold: 0,
    };
    const state = userSlice.reducer(
      cartState,
      subtractUnitToProduct(newCartProduct)
    );

    //Originalmente la cantidad era 2
    expect(state.cart[0].quantity).toBe(1);
  });

  test("Debe de calcular el total a pagar del carrito", () => {
    const state = userSlice.reducer(cartState, setTotalToPay());

    expect(state.totalToPay).toBe(totalToPayTest);
  });

  test("Debe de calcular el total de productos en el carrito", () => {
    const state = userSlice.reducer(cartState, setTotalItemsInCart());

    expect(state.totalItemsInCart).toBe(totalItemsInCartTest);
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
