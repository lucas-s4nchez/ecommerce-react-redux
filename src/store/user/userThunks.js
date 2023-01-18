import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewAddress,
  addNewCard,
  addProductToCart,
  addProductToFavorites,
  addUnitToProduct,
  clearFavorites,
  deleteProductFromCart,
  deleteProductFromFavorites,
  disabled,
  isLoading,
  setAddresses,
  setCards,
  setCart,
  setFavorites,
  subtractUnitToProduct,
} from "./userSlice";

export const startLoadingUserInfo = () => {
  return async (dispatch, getState) => {
    dispatch(isLoading());
    const { uid } = getState().auth;
    const cartRef = collection(FirebaseDB, `users/${uid}/cart`);
    const cartDocs = await getDocs(cartRef);
    const favoritesRef = collection(FirebaseDB, `users/${uid}/favorites`);
    const favoritesDocs = await getDocs(favoritesRef);
    const addressesRef = collection(FirebaseDB, `users/${uid}/addresses`);
    const addressesDocs = await getDocs(addressesRef);
    const cardsRef = collection(FirebaseDB, `users/${uid}/cards`);
    const cardsDocs = await getDocs(cardsRef);

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

    dispatch(setCart(cart));
    dispatch(setFavorites(favorites));
    dispatch(setAddresses(addresses));
    dispatch(setCards(cards));
    dispatch(isLoading());
  };
};

export const startAddingProductToFavorites = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { products } = getState().products;

    const newFavoriteProduct = {
      ...products.find((product) => product.id === id),
    };
    const newDoc = doc(collection(FirebaseDB, `users/${uid}/favorites`));
    newFavoriteProduct.docId = newDoc.id;
    const setDocResp = await setDoc(newDoc, newFavoriteProduct);

    dispatch(addProductToFavorites(newFavoriteProduct));
  };
};

export const startDeletingProductFromFavorites = (docId, id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docRef = doc(FirebaseDB, `users/${uid}/favorites/${docId}`);
    await deleteDoc(docRef);

    dispatch(deleteProductFromFavorites(id));
  };
};

export const startDeletingAllProductsFromFavorites = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { favorites } = getState().user;

    favorites.forEach(async (product) => {
      const docRef = doc(FirebaseDB, `users/${uid}/favorites/${product.docId}`);
      await deleteDoc(docRef);
    });

    dispatch(clearFavorites());
  };
};

export const startAddingProductToCart = (id, quantity, size) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { products } = getState().products;

    const product = {
      ...products.find((product) => product.id === id),
    };
    const cartProduct = {
      brand: product.brand,
      model: product.model,
      version: product.version,
      price: product.price,
      stock: product.stock,
      discount: product.discount,
      quantity: quantity,
      size: size,
      image: product.images[0],
      colors: product.colors,
    };
    if (cartProduct.discount > 0) {
      const newPrice =
        cartProduct.price - (cartProduct.price * cartProduct.discount) / 100;
      cartProduct.price = newPrice;
    }
    const newDoc = doc(collection(FirebaseDB, `users/${uid}/cart`));
    cartProduct.id = newDoc.id;
    cartProduct.productId = id;
    const setDocResp = await setDoc(newDoc, cartProduct);
    dispatch(addProductToCart(cartProduct));
  };
};

export const startAddingUnitToProduct = (id, quantity, size) => {
  return async (dispatch, getState) => {
    dispatch(disabled());
    const { uid } = getState().auth;
    const { cart } = getState().user;

    const newProduct = {
      ...cart.find((product) => product.id === id && product.size === size),
    };

    const newProductUpdate = {
      ...newProduct,
      quantity: newProduct.quantity + quantity,
    };
    delete newProductUpdate.id; //Elimino el id porque no quiero crearla de nuevo
    const docRef = doc(FirebaseDB, `users/${uid}/cart/${id}`);
    await setDoc(docRef, newProductUpdate, { merge: true });
    dispatch(addUnitToProduct({ cartProduct: newProduct, quantity: quantity }));
    dispatch(disabled());
  };
};

export const startRemoveUnitToProduct = (id, quantity, size) => {
  return async (dispatch, getState) => {
    dispatch(disabled());
    const { uid } = getState().auth;
    const { cart } = getState().user;

    const newProduct = {
      ...cart.find((product) => product.id === id && product.size === size),
    };

    const newProductUpdate = {
      ...newProduct,
      quantity: newProduct.quantity - quantity,
    };
    delete newProductUpdate.id; //Elimino el id porque no quiero crearla de nuevo
    const docRef = doc(FirebaseDB, `users/${uid}/cart/${id}`);
    await setDoc(docRef, newProductUpdate, { merge: true });
    dispatch(
      subtractUnitToProduct({ cartProduct: newProduct, quantity: quantity })
    );
    dispatch(disabled());
  };
};

export const startDeletingProductFromCart = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { cart } = getState().user;

    const currentProduct = { ...cart.find((product) => product.id === id) };

    const docRef = doc(FirebaseDB, `users/${uid}/cart/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteProductFromCart(currentProduct));
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
