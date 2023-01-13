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
  clearFavorites,
  deleteProductFromFavorites,
  isLoading,
  setCart,
  setFavorites,
} from "./userSlice";

export const startLoadingUserInfo = () => {
  return async (dispatch, getState) => {
    dispatch(isLoading());
    const { uid } = getState().auth;
    const cartRef = collection(FirebaseDB, `users/${uid}/cart`);
    const cartDocs = await getDocs(cartRef);
    const favoritesRef = collection(FirebaseDB, `users/${uid}/favorites`);
    const favoritesDocs = await getDocs(favoritesRef);

    const cart = [];
    cartDocs.forEach((doc) => {
      cart.push({ id: doc.id, ...doc.data() });
    });
    const favorites = [];
    favoritesDocs.forEach((doc) => {
      favorites.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setCart(cart));
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
      quantity: quantity,
      size: size,
      image: product.images[0],
      colors: product.colors,
    };
    const newDoc = doc(collection(FirebaseDB, `users/${uid}/cart`));
    cartProduct.id = newDoc.id;
    cartProduct.productId = id;
    const setDocResp = await setDoc(newDoc, cartProduct);
    dispatch(addProductToCart(cartProduct));
  };
};

export const startAddingUnitToProduct = (id, quantity, size) => {
  return async (dispatch, getState) => {
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
  };
};
