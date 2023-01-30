import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { isLoadingProducts, setProducts } from "./productsSlice";

export const startLoadingProducts = () => {
  return async (dispatch) => {
    dispatch(isLoadingProducts());
    //referencia a la coleccion de la que obtenemos datos
    const collectionRef = collection(FirebaseDB, `/products`);
    const docs = await getDocs(collectionRef);

    //llenar un array con la info de la coleccion
    const products = [];
    docs.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setProducts(products));
    dispatch(isLoadingProducts());
  };
};
export const startAddNewProduct = async () => {
  const docRef = await addDoc(collection(FirebaseDB, "products"), {
    // agregar producto
  });
};
