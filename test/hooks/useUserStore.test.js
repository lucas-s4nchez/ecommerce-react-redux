import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { deleteDoc, doc } from "firebase/firestore/lite";
import { Provider } from "react-redux";
import { FirebaseDB } from "../../src/firebase/config";
import { useUserStore } from "../../src/hooks/useUserStore";
import { authSlice } from "../../src/store/auth/authSlice";
import { productsSlice } from "../../src/store/products/productsSlice";
import { userSlice } from "../../src/store/user/userSlice";
import { authenticatedState, testUser } from "../fixtures/authFixtures";
import { productsLoadedState } from "../fixtures/productsFixtures";
import { userInitialState } from "../fixtures/userFixtures";

const getMockStore = (userState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      user: userSlice.reducer,
      products: productsSlice.reducer,
    },
    preloadedState: {
      auth: { ...authenticatedState },
      user: { ...userState },
      products: { ...productsLoadedState },
    },
  });
};

describe("Pruebas en el useUserStore", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Debe retornar los valores por defecto ", () => {
    const mockStore = getMockStore({ ...userInitialState });

    //Como renderizar un hook con un store de redux
    const { result } = renderHook(() => useUserStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      isLoading: false,
      disabled: false,
      favorites: [],
      cart: [],
      purchases: [],
      totalItemsInCart: 0,
      totalToPay: 0,
      addresses: [],
      cards: [],
      activeAddress: null,
      paymentMethod: null,
      startLoadingUserInfo: expect.any(Function),
      startAddingProductToFavorites: expect.any(Function),
      startDeletingProductFromFavorites: expect.any(Function),
      startDeletingAllProductsFromFavorites: expect.any(Function),
      startAddingProductToCart: expect.any(Function),
      startAddingUnitToProduct: expect.any(Function),
      startRemoveUnitToProduct: expect.any(Function),
      startDeletingProductFromCart: expect.any(Function),
      startAddingNewAddress: expect.any(Function),
      startDeletingAddress: expect.any(Function),
      startAddingNewCard: expect.any(Function),
      startDeletingCard: expect.any(Function),
      startAddingNewPurchase: expect.any(Function),
      startAddingNewReview: expect.any(Function),
    });
  });

  test("startAddingProductToFavorites debe de agregar un producto a favoritos y startDeletingProductFromFavorites debe de eliminar un producto de favoritos", async () => {
    const mockStore = getMockStore({ ...userInitialState });
    const productId = "4hekghyh5jgwMcImmKPQ";

    const { result } = renderHook(() => useUserStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    //Agregar
    await act(async () => {
      await result.current.startAddingProductToFavorites(productId);
    });
    expect(result.current.favorites.length).toBe(1);

    //Borrar
    await act(async () => {
      await result.current.startDeletingProductFromFavorites(
        result.current.favorites[0].id
      );
    });
    expect(result.current.favorites.length).toBe(0);
  });

  test("Debe de agregar un producto al carrito, sumarle 1 unidad, restarle 1 unidad y por último eliminarlo", async () => {
    const mockStore = getMockStore({ ...userInitialState });
    const cartProduct = { id: "4hekghyh5jgwMcImmKPQ", quantity: 2, size: 44 };

    const { result } = renderHook(() => useUserStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    //Agregar un producto al carrito (startAddingProductToCart)
    await act(async () => {
      await result.current.startAddingProductToCart(
        cartProduct.id,
        cartProduct.quantity,
        cartProduct.size
      );
    });

    expect(result.current.cart.length).toBe(1);

    //Agregarle 1 unidad (startAddingUnitToProduct)
    await act(async () => {
      await result.current.startAddingUnitToProduct(
        result.current.cart[0].id,
        1,
        cartProduct.size
      );
    });

    expect(result.current.cart[0].quantity).toBe(3);

    //Restarle 1 unidad (startRemoveUnitToProduct)
    await act(async () => {
      await result.current.startRemoveUnitToProduct(
        result.current.cart[0].id,
        1,
        cartProduct.size
      );
    });

    expect(result.current.cart[0].quantity).toBe(2);

    //Borrarlo del carrito (startDeletingProductFromCart)
    await act(async () => {
      await result.current.startDeletingProductFromCart(
        result.current.cart[0].id
      );
    });

    expect(result.current.cart.length).toBe(0);
  }, 10000);

  test("startAddingNewAddress debe de añadir un nuevo domicilio y startDeletingAddress debe de eliminarlo", async () => {
    const mockStore = getMockStore({ ...userInitialState });
    const newAddress = {
      city: "Las Grutas",
      province: "Rio Negro",
      street: "Belgrano",
      streetNumber: 30,
    };

    const { result } = renderHook(() => useUserStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    //Agregar un docimilio
    await act(async () => {
      await result.current.startAddingNewAddress(newAddress);
    });
    expect(result.current.addresses.length).toBe(1);
    expect(result.current.addresses[0]).toEqual({
      city: "Las Grutas",
      province: "Rio Negro",
      street: "Belgrano",
      streetNumber: 30,
      id: expect.any(String),
    });

    //Eliminar un domicilio
    await act(async () => {
      await result.current.startDeletingAddress(result.current.addresses[0].id);
    });
    expect(result.current.addresses.length).toBe(0);
  });

  test("startAddingNewCard debe de añadir una nueva tarjeta y startDeletingCard debe de eliminarla", async () => {
    const mockStore = getMockStore({ ...userInitialState });
    const newCard = {
      cvc: "890",
      expiryMonth: 2,
      expiryYear: 25,
      name: "Lucas Sanchez",
      number: "45848452416445678",
    };

    const { result } = renderHook(() => useUserStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    //Agregar una tarjeta
    await act(async () => {
      await result.current.startAddingNewCard(newCard);
    });
    expect(result.current.cards.length).toBe(1);
    expect(result.current.cards[0]).toEqual({
      cvc: "890",
      expiryMonth: 2,
      expiryYear: 25,
      name: "Lucas Sanchez",
      number: "45848452416445678",
      id: expect.any(String),
    });

    //Eliminar una tarjeta
    await act(async () => {
      await result.current.startDeletingCard(result.current.cards[0].id);
    });
    expect(result.current.cards.length).toBe(0);
  });

  test("startAddingNewPurchase debe de añadir una nueva compra ", async () => {
    const mockStore = getMockStore({ ...userInitialState });
    const newPurchase = {
      brand: "Adidas",
      colors: ["blanco", "rojo"],
      image: "https://image3.com",
      model: "Court",
      price: 20000,
      productId: "4hekghyh5jgwMcImmKPQ",
      quantity: 1,
      size: 44,
      version: "",
      waitingToReceiveRating: true,
    };

    const { result } = renderHook(() => useUserStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startAddingNewPurchase(newPurchase);
    });

    expect(result.current.purchases[0]).toEqual({
      ...newPurchase,
      id: expect.any(String),
    });

    //borrar de firebase
    const docRef = doc(
      FirebaseDB,
      `users/${testUser.uid}/purchases/${result.current.purchases[0].id}`
    );
    await deleteDoc(docRef);
  }, 10000);

  test("startAddingNewReview debe de agregar una nueva reseña a un producto", async () => {
    const mockStore = getMockStore({ ...userInitialState });
    const newReview = {
      id: "4hekghyh5jgwMcImmKPQ",
      comment: "Están pipi cucu",
      rating: 5,
      userName: "Naruto Uzumaki",
      date: Date.now(),
    };

    const { result } = renderHook(() => useUserStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startAddingNewReview(newReview);
    });

    const currentProduct = mockStore.getState().products.products[0].reviews;

    expect(currentProduct).toContainEqual({
      comment: newReview.comment,
      rating: newReview.rating,
      userName: newReview.userName,
      date: newReview.date,
    });
  });
});
