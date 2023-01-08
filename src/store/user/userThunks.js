import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewProductsToFavorites,
  deleteProductFromFavoritesById,
  isLoading,
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

export const startAddingANewProductToFavorites = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { products } = getState().products;

    const newFavoriteProduct = {
      ...products.find((product) => product.id === id),
    };
    const newDoc = doc(collection(FirebaseDB, `users/${uid}/favorites`));
    const setDocResp = await setDoc(newDoc, newFavoriteProduct);
    newFavoriteProduct.docId = newDoc.id;

    dispatch(addNewProductsToFavorites(newFavoriteProduct));
  };
};

export const startDeletingProductFromFavorites = (docId, id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docRef = doc(FirebaseDB, `users/${uid}/favorites/${docId}`);
    await deleteDoc(docRef);

    dispatch(deleteProductFromFavoritesById(id));
  };
};
