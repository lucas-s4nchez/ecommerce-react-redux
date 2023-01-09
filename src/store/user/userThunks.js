import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addProductToCart,
  addProductToFavorites,
  addUnitToProduct,
  deleteProductFromFavorites,
  isLoading,
  setCart,
  setFavorites,
} from "./userSlice";

export const startLoadingFavorites = () => {
  return async (dispatch, getState) => {
    dispatch(isLoading());
    const { uid } = getState().auth;

    const collectionRef = collection(FirebaseDB, `users/${uid}/favorites`);
    const docs = await getDocs(collectionRef);

    const favorites = [];
    docs.forEach((doc) => {
      favorites.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setFavorites(favorites));
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
    const setDocResp = await setDoc(newDoc, newFavoriteProduct);
    newFavoriteProduct.docId = newDoc.id;

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

export const startLoadingCart = () => {
  return async (dispatch, getState) => {
    dispatch(isLoading());
    const { uid } = getState().auth;

    const collectionRef = collection(FirebaseDB, `users/${uid}/cart`);
    const docs = await getDocs(collectionRef);

    const cart = [];
    docs.forEach((doc) => {
      cart.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setCart(cart));
    dispatch(isLoading());
  };
};
export const startAddingProductToCart = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { products } = getState().products;

    const newProduct = {
      ...products.find((product) => product.id === id),
      quantity: 1,
    };
    const newDoc = doc(collection(FirebaseDB, `users/${uid}/cart`));
    const setDocResp = await setDoc(newDoc, newProduct);
    newProduct.docId = newDoc.id;
    dispatch(addProductToCart(newProduct));
  };
};
export const startAddingUnitToProduct = (docId, id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { cart } = getState().user;

    const newProduct = {
      ...cart.find((product) => product.id === id),
    };

    const newProductUpdate = {
      ...newProduct,
      quantity: newProduct.quantity + 1,
    };
    delete newProductUpdate.id; //Elimino el id porque no quiero crearla de nuevo
    const docRef = doc(FirebaseDB, `users/${uid}/cart/${docId}`);
    await setDoc(docRef, newProductUpdate, { merge: true });
    dispatch(addUnitToProduct(newProduct));
  };
};
