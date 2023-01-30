import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { updateProduct } from "../products/productsSlice";
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
    const { uid } = getState().auth;
    const newDoc = doc(collection(FirebaseDB, `users/${uid}/cart`));
    product.id = newDoc.id;
    const setDocResp = await setDoc(newDoc, product);
    dispatch(addProductToCart(product));
    dispatch(setTotalToPay());
    dispatch(setTotalItemsInCart());
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

export const startAddingNewAddress = (values) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newAddress = {
      ...values,
    };

    const newDoc = doc(collection(FirebaseDB, `users/${uid}/addresses`));
    const setDocResp = await setDoc(newDoc, newAddress);

    newAddress.id = newDoc.id;

    dispatch(addNewAddress(newAddress));
  };
};

export const startDeletingAddress = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { addresses } = getState().user;

    const currentAddress = {
      ...addresses.find((address) => address.id === id),
    };

    const docRef = doc(FirebaseDB, `users/${uid}/addresses/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteAddress(currentAddress));
  };
};

export const startAddingNewCard = (values) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newCard = {
      ...values,
    };

    const newDoc = doc(collection(FirebaseDB, `users/${uid}/cards`));
    const setDocResp = await setDoc(newDoc, newCard);

    newCard.id = newDoc.id;

    dispatch(addNewCard(newCard));
  };
};

export const startDeletingCard = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { cards } = getState().user;
    const currentCard = {
      ...cards.find((address) => address.id === id),
    };

    const docRef = doc(FirebaseDB, `users/${uid}/cards/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteCard(currentCard));
  };
};

export const startAddingNewPurchase = (values) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { products } = getState().products;
    const { cart } = getState().user;

    const newPurchase = {
      ...values,
    };
    //Añade una compra a la base de datos
    const newDoc = doc(collection(FirebaseDB, `users/${uid}/purchases`));
    const setDocResp = await setDoc(newDoc, newPurchase);
    newPurchase.id = newDoc.id;
    //Resta las cantidad comprada, del stock. Añade la cantidad a las ventas
    const currentProduct = {
      ...products.find((product) => product.id === values.productId),
    };
    const newProduct = {
      ...currentProduct,
      stock: currentProduct.stock - values.quantity,
      sold: currentProduct.sold + values.quantity,
    };
    delete newProduct.id;
    const docRef = doc(FirebaseDB, `/products/${currentProduct.id}`);
    await setDoc(docRef, newProduct, { merge: true });
    //Limpia el carrito
    cart.forEach(async (product) => {
      const docRef = doc(FirebaseDB, `users/${uid}/cart/${product.id}`);
      await deleteDoc(docRef);
    });

    dispatch(addNewPurchase(newPurchase));
    dispatch(
      updateProduct({ productId: values.productId, product: newProduct })
    );
    dispatch(clearPaymentMethod());
    dispatch(clearActiveAddress());
  };
};

export const startAddingNewReview = (item) => {
  return async (dispatch, getState) => {
    const { purchases } = getState().user;
    const { uid } = getState().auth;
    const { products } = getState().products;

    dispatch(isDisabled());

    //Agrega la nueva review
    const currentProduct = {
      ...products.find((product) => product.id === item.id),
    };
    const newProduct = {
      ...currentProduct,
      reviews: [
        ...currentProduct.reviews,
        {
          comment: item.comment,
          rating: item.rating,
          date: item.date,
          userName: item.userName,
        },
      ],
    };
    delete newProduct.id;

    const docRef = doc(FirebaseDB, `/products/${currentProduct.id}`);
    await setDoc(docRef, newProduct, { merge: true });

    //Cambiar 'waitingToReceiveRating' a false
    const currentPurchase = {
      ...purchases.find((product) => product.id === item.purchaseId),
    };
    const newPurchase = {
      ...currentPurchase,
      waitingToReceiveRating: false,
    };
    delete newPurchase.id;

    const purchaseRef = doc(
      FirebaseDB,
      `users/${uid}/purchases/${item.purchaseId}`
    );
    await setDoc(purchaseRef, newPurchase, { merge: true });

    dispatch(
      updateProduct({ productId: currentProduct.id, product: newProduct })
    );
    dispatch(
      updatePurchase({ purchaseId: item.purchaseId, purchase: newPurchase })
    );
    dispatch(isDisabled());
    // startLoadingProducts();
  };
};
