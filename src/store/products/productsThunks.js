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
    dispatch(setMenProducts());
    dispatch(setWomenProducts());
    dispatch(setKidProducts());
    dispatch(setProductsOnOffer());
    dispatch(setFeaturedProducts());
    dispatch(isLoading());
  };
};
