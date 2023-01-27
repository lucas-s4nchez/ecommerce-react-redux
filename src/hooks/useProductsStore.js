import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import {
  isLoadingProducts,
  setFeaturedProducts,
  setKidProducts,
  setMenProducts,
  setProducts,
  setProductsOnOffer,
  setWomenProducts,
} from "../store/products/productsSlice";

export const useProductsStore = () => {
  const {
    isLoading,
    products,
    menProducts,
    womenProducts,
    kidProducts,
    featuredProducts,
    productsOnOffer,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const startLoadingProducts = async () => {
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
  const startAddNewProduct = async () => {
    const docRef = await addDoc(collection(FirebaseDB, "products"), {
      // agregar producto
    });
  };
  return {
    //Propiedades
    isLoading,
    products,
    menProducts,
    womenProducts,
    kidProducts,
    featuredProducts,
    productsOnOffer,
    //Métodos
    startLoadingProducts,
    startAddNewProduct,
  };
};
