import {
  loginWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../helpers";
import { clearFavoritesOnLogout } from "../user/userSlice";
import { checkingCredentials, isError, login, logout } from "./authSlice";

export const startGoogleSigIn = () => {
  return async (dispatch) => {
    //comienza el login
    dispatch(checkingCredentials());
    //obtiene los resultados
    const result = await signInWithGoogle();
    //si hay un error
    if (!result.ok && result.errorMessage) {
      dispatch(isError(result));
    }
    if (!result.ok) return dispatch(logout());
    //si no hay un error
    dispatch(login(result));
  };
};

export const startRegisterUserwithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailAndPassword({
        email,
        password,
        displayName,
      });
    if (!ok && errorMessage) {
      dispatch(isError({ errorMessage }));
    }
    if (!ok) return dispatch(logout());

    dispatch(login({ ok, uid, email, displayName, photoURL }));
  };
};
export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, displayName, photoURL, errorMessage } =
      await loginWithEmailAndPassword({ email, password });
    if (!ok && errorMessage) {
      dispatch(isError({ errorMessage }));
    }
    if (!ok) return dispatch(logout());
    dispatch(login({ ok, uid, email, displayName, photoURL }));
  };
};
export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    //vaciar el array de favoritos
    dispatch(clearFavoritesOnLogout());
    //Logout
    dispatch(logout());
  };
};
