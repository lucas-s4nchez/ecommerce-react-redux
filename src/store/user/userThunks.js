import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { updateProduct } from "../products/productsSlice";
import { startLoadingProducts } from "../products/productsThunks";
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
} from "./userSlice";

export const startLoadingUserInfo = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    dispatch(isLoadingUserInfo());

    const cartRef = collection(FirebaseDB, `users/${uid}/cart`);
    const cartDocs = await getDocs(cartRef);
    const favoritesRef = collection(FirebaseDB, `users/${uid}/favorites`);
    const favoritesDocs = await getDocs(favoritesRef);
    const addressesRef = collection(FirebaseDB, `users/${uid}/addresses`);
    const addressesDocs = await getDocs(addressesRef);
    const cardsRef = collection(FirebaseDB, `users/${uid}/cards`);
    const cardsDocs = await getDocs(cardsRef);
    const purchasesRef = collection(FirebaseDB, `users/${uid}/purchases`);
    const purchasesDocs = await getDocs(purchasesRef);

    const cart = [];
    cartDocs.forEach((doc) => {
      cart.push({ id: doc.id, ...doc.data() });
    });
    const favorites = [];
    favoritesDocs.forEach((doc) => {
      favorites.push({ id: doc.id, ...doc.data() });
    });
    const addresses = [];
    addressesDocs.forEach((doc) => {
      addresses.push({ id: doc.id, ...doc.data() });
    });
    const cards = [];
    cardsDocs.forEach((doc) => {
      cards.push({ id: doc.id, ...doc.data() });
    });
    const purchases = [];
    purchasesDocs.forEach((doc) => {
      purchases.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setCart(cart));
    dispatch(setFavorites(favorites));
    dispatch(setAddresses(addresses));
    dispatch(setCards(cards));
    dispatch(setPurchases(purchases));
    dispatch(setTotalItemsInCart());
    dispatch(setTotalToPay());
    dispatch(isLoadingUserInfo());
  };
};

export const startAddingProductToFavorites = (product) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newDoc = doc(collection(FirebaseDB, `users/${uid}/favorites`));
    product.id = newDoc.id;

    const setDocResp = await setDoc(newDoc, product);

    dispatch(addProductToFavorites(product));
  };
};

export const startDeletingProductFromFavorites = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const docRef = doc(FirebaseDB, `users/${uid}/favorites/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteProductFromFavorites(id));
  };
};

export const startAddingProductToCart = (product) => {
  return async (dispatch, getState) => {
    dispatch(isDisabled());
    const { uid } = getState().auth;
    const newDoc = doc(collection(FirebaseDB, `users/${uid}/cart`));
    product.id = newDoc.id;
    const setDocResp = await setDoc(newDoc, product);
    dispatch(addProductToCart(product));
    dispatch(setTotalToPay());
    dispatch(setTotalItemsInCart());
    dispatch(isDisabled());
  };
};

export const startAddingUnitToProduct = (product) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    dispatch(isDisabled());
    const docRef = doc(FirebaseDB, `users/${uid}/cart/${product.id}`);
    await setDoc(docRef, product, { merge: true });
    dispatch(addUnitToProduct(product));
    dispatch(setTotalToPay());
    dispatch(setTotalItemsInCart());
    dispatch(isDisabled());
  };
};

export const startRemoveUnitToProduct = (product) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    dispatch(isDisabled());
    const docRef = doc(FirebaseDB, `users/${uid}/cart/${product.id}`);
    await setDoc(docRef, product, { merge: true });
    dispatch(subtractUnitToProduct(product));
    dispatch(setTotalToPay());
    dispatch(setTotalItemsInCart());
    dispatch(isDisabled());
  };
};

export const startDeletingProductFromCart = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docRef = doc(FirebaseDB, `users/${uid}/cart/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteProductFromCart(id));
    dispatch(setTotalToPay());
    dispatch(setTotalItemsInCart());
  };
};

export const startAddingNewAddress = (newAddress) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newDoc = doc(collection(FirebaseDB, `users/${uid}/addresses`));
    const setDocResp = await setDoc(newDoc, newAddress);

    newAddress.id = newDoc.id;

    dispatch(addNewAddress(newAddress));
  };
};

export const startDeletingAddress = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docRef = doc(FirebaseDB, `users/${uid}/addresses/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteAddress(id));
  };
};

export const startAddingNewCard = (card) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newDoc = doc(collection(FirebaseDB, `users/${uid}/cards`));
    const setDocResp = await setDoc(newDoc, card);

    card.id = newDoc.id;

    dispatch(addNewCard(card));
  };
};

export const startDeletingCard = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docRef = doc(FirebaseDB, `users/${uid}/cards/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteCard(id));
  };
};

export const startAddingNewPurchase = ({ purchase, product }) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { cart } = getState().user;

    const newDoc = doc(collection(FirebaseDB, `users/${uid}/purchases`));
    const setDocResp = await setDoc(newDoc, purchase);
    purchase.id = newDoc.id;
    //Actualiza el producto
    const docRef = doc(FirebaseDB, `/products/${product.id}`);
    await setDoc(docRef, product, { merge: true });
    //Limpia el carrito
    cart.forEach(async (product) => {
      const docRef = doc(FirebaseDB, `users/${uid}/cart/${product.id}`);
      await deleteDoc(docRef);
    });

    dispatch(updateProduct(product));
    dispatch(addNewPurchase(purchase));
    dispatch(clearPaymentMethod());
    dispatch(clearActiveAddress());
  };
};

export const startAddingNewReview = ({ product, purchase }) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    dispatch(isDisabled());

    const docRef = doc(FirebaseDB, `/products/${product.id}`);
    await setDoc(docRef, product, { merge: true });

    //Cambiar 'waitingToReceiveRating' a false
    const purchaseRef = doc(
      FirebaseDB,
      `users/${uid}/purchases/${purchase.id}`
    );
    await setDoc(purchaseRef, purchase, { merge: true });

    dispatch(updateProduct(product));
    dispatch(updatePurchase(purchase));
    dispatch(isDisabled());
  };
};
