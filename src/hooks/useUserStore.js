import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseDB } from "../firebase/config";
import { updateProduct } from "../store/products/productsSlice";
import {
  isDisabled,
  isLoadingUserInfo,
  addNewAddress,
  addNewCard,
  addNewPurchase,
  addProductToCart,
  addProductToFavorites,
  addUnitToProduct,
  clearActiveAddress,
  clearFavorites,
  clearPaymentMethod,
  deleteAddress,
  deleteCard,
  deleteProductFromCart,
  deleteProductFromFavorites,
  setAddresses,
  setCards,
  setCart,
  setFavorites,
  setPurchases,
  subtractUnitToProduct,
  updatePurchase,
} from "../store/user/userSlice";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = () => {
  const {
    isLoading,
    disabled,
    favorites,
    cart,
    purchases,
    totalItemsInCart,
    totalToPay,
    addresses,
    cards,
    activeAddress,
    paymentMethod,
  } = useSelector((state) => state.user);
  const { uid } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const startLoadingUserInfo = async (currentUID) => {
    dispatch(isLoadingUserInfo());

    const cartRef = collection(FirebaseDB, `users/${currentUID}/cart`);
    const cartDocs = await getDocs(cartRef);
    const favoritesRef = collection(
      FirebaseDB,
      `users/${currentUID}/favorites`
    );
    const favoritesDocs = await getDocs(favoritesRef);
    const addressesRef = collection(
      FirebaseDB,
      `users/${currentUID}/addresses`
    );
    const addressesDocs = await getDocs(addressesRef);
    const cardsRef = collection(FirebaseDB, `users/${currentUID}/cards`);
    const cardsDocs = await getDocs(cardsRef);
    const purchasesRef = collection(
      FirebaseDB,
      `users/${currentUID}/purchases`
    );
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
    dispatch(isLoadingUserInfo());
  };

  const startAddingProductToFavorites = async (id) => {
    const newFavoriteProduct = {
      ...products.find((product) => product.id === id),
    };
    const newDoc = doc(collection(FirebaseDB, `users/${uid}/favorites`));
    newFavoriteProduct.docId = newDoc.id;
    const setDocResp = await setDoc(newDoc, newFavoriteProduct);

    dispatch(addProductToFavorites(newFavoriteProduct));
  };

  const startDeletingProductFromFavorites = async (docId, id) => {
    const docRef = doc(FirebaseDB, `users/${uid}/favorites/${docId}`);
    await deleteDoc(docRef);

    dispatch(deleteProductFromFavorites(id));
  };

  const startDeletingAllProductsFromFavorites = async () => {
    favorites.forEach(async (product) => {
      const docRef = doc(FirebaseDB, `users/${uid}/favorites/${product.docId}`);
      await deleteDoc(docRef);
    });

    dispatch(clearFavorites());
  };

  const startAddingProductToCart = async (id, quantity, size) => {
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

  const startAddingUnitToProduct = async (id, quantity, size) => {
    dispatch(isDisabled());

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
    dispatch(isDisabled());
  };

  const startRemoveUnitToProduct = async (id, quantity, size) => {
    dispatch(isDisabled());

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
    dispatch(isDisabled());
  };

  const startDeletingProductFromCart = async (id) => {
    const currentProduct = { ...cart.find((product) => product.id === id) };

    const docRef = doc(FirebaseDB, `users/${uid}/cart/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteProductFromCart(currentProduct));
  };

  const startAddingNewAddress = async (values) => {
    const newAddress = {
      ...values,
    };

    const newDoc = doc(collection(FirebaseDB, `users/${uid}/addresses`));
    const setDocResp = await setDoc(newDoc, newAddress);

    newAddress.id = newDoc.id;

    dispatch(addNewAddress(newAddress));
  };

  const startDeletingAddress = async (id) => {
    const currentAddress = {
      ...addresses.find((address) => address.id === id),
    };

    const docRef = doc(FirebaseDB, `users/${uid}/addresses/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteAddress(currentAddress));
  };

  const startAddingNewCard = async (values) => {
    const newCard = {
      ...values,
    };

    const newDoc = doc(collection(FirebaseDB, `users/${uid}/cards`));
    const setDocResp = await setDoc(newDoc, newCard);

    newCard.id = newDoc.id;

    dispatch(addNewCard(newCard));
  };

  const startDeletingCard = async (id) => {
    const currentCard = {
      ...cards.find((address) => address.id === id),
    };

    const docRef = doc(FirebaseDB, `users/${uid}/cards/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteCard(currentCard));
  };

  const startAddingNewPurchase = async (values) => {
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

  const startAddingNewReview = async (item) => {
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

  return {
    //Propiedades
    isLoading,
    disabled,
    favorites,
    cart,
    purchases,
    totalItemsInCart,
    totalToPay,
    addresses,
    cards,
    activeAddress,
    paymentMethod,

    //Métodos
    startLoadingUserInfo,
    startAddingProductToFavorites,
    startDeletingProductFromFavorites,
    startDeletingAllProductsFromFavorites,
    startAddingProductToCart,
    startAddingUnitToProduct,
    startRemoveUnitToProduct,
    startDeletingProductFromCart,
    startAddingNewAddress,
    startDeletingAddress,
    startAddingNewCard,
    startDeletingCard,
    startAddingNewPurchase,
    startAddingNewReview,
  };
};
