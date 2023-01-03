import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  isLoading,
  setFeaturedProducts,
  setProducts,
  setProductsOnOffer,
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
    //referencia a la coleccion de la que obtenemos datos
    const collectionRef = collection(FirebaseDB, `/products`);
    const docs = await getDocs(collectionRef);

    //llenar un array con la info de la coleccion
    const products = [];
    docs.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    const productsOnOffer = products.filter((product) => product.discount > 0);

    dispatch(setProductsOnOffer(productsOnOffer));
    dispatch(isLoading());
  };
};
export const startLoadingFeaturedProducts = () => {
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
    const featuredProducts = products.filter(
      (product) => product.featured === true
    );

    dispatch(setFeaturedProducts(featuredProducts));
    dispatch(isLoading());
  };
};
