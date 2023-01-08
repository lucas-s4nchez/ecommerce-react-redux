import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingProducts } from "../store/products/productsThunks";
import { startLoadingFavorites } from "../store/user";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, displayName, email, photoURL } = user;
      dispatch(login({ uid, displayName, email, photoURL }));
      dispatch(startLoadingProducts());
      dispatch(startLoadingFavorites());
    });
  }, []);

  return status;
};
