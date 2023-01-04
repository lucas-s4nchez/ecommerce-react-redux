import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  isLoading,
  setFeaturedProducts,
  setKidProducts,
  setMenProducts,
  setProducts,
  setProductsOnOffer,
  setWomenProducts,
} from "./productsSlice";

export const startLoadingProducts = () => {
  return async (dispatch) => {
    dispatch(isLoading());
    //referencia a la coleccion de la que obtenemos datos
    const collectionRef = collection(FirebaseDB, `/products`);
    const docs = await getDocs(collectionRef);

    //llenar un array con la info de la coleccion
    const products = [];
    docs.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setProducts(products));
    dispatch(isLoading());
  };
};
export const startLoadingProductsOnOffer = () => {
  return async (dispatch) => {
    dispatch(isLoading());
    //query para obtener los productos que tengan descuento
    const q = query(
      collection(FirebaseDB, "products"),
      where("discount", ">", 0)
    );
    const docs = await getDocs(q);

    //llenar un array con la info de la coleccion
    const products = [];
    docs.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setProductsOnOffer(products));
    dispatch(isLoading());
  };
};
export const startLoadingFeaturedProducts = () => {
  return async (dispatch) => {
    dispatch(isLoading());
    const q = query(
      collection(FirebaseDB, "products"),
      where("featured", "==", true)
    );
    const docs = await getDocs(q);

    const products = [];
    docs.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    // const docRef = await addDoc(collection(FirebaseDB, "products"), {
    // agregar producto
    // });
    dispatch(setFeaturedProducts(products));
    dispatch(isLoading());
  };
};
export const startLoadingMenProducts = () => {
  return async (dispatch) => {
    dispatch(isLoading());
    const q = query(
      collection(FirebaseDB, "products"),
      where("gender", "==", "Hombre")
    );
    const docs = await getDocs(q);

    const products = [];
    docs.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setMenProducts(products));
    dispatch(isLoading());
  };
};
export const startLoadingWomenProducts = () => {
  return async (dispatch) => {
    dispatch(isLoading());
    const q = query(
      collection(FirebaseDB, "products"),
      where("gender", "==", "Mujer")
    );
    const docs = await getDocs(q);

    const products = [];
    docs.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setWomenProducts(products));
    dispatch(isLoading());
  };
};
export const startLoadingKidProducts = () => {
  return async (dispatch) => {
    dispatch(isLoading());
    const q = query(
      collection(FirebaseDB, "products"),
      where("gender", "==", "Niños")
    );
    const docs = await getDocs(q);

    const products = [];
    docs.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setKidProducts(products));
    dispatch(isLoading());
  };
};
