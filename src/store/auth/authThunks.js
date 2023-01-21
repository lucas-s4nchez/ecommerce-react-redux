import {
  loginWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../helpers";
import { changeDisplayName } from "../../helpers/changeDisplayName";
import { changeEmail } from "../../helpers/changeEmail";
import { changePassword } from "../../helpers/changePassword";
import {
  clearActiveAddress,
  clearAddresses,
  clearCards,
  clearCart,
  clearFavorites,
  clearPaymentMethod,
  clearPurchases,
} from "../user/userSlice";
import {
  checkingCredentials,
  isError,
  isSuccess,
  login,
  logout,
  updateDisplayName,
  updateEmail,
} from "./authSlice";

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
    // if (!ok && errorMessage) {
    //   dispatch(isError({ errorMessage }));
    // }
    if (!ok) return dispatch(logout(errorMessage));

    dispatch(login({ ok, uid, email, displayName, photoURL }));
  };
};
export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, displayName, photoURL, errorMessage } =
      await loginWithEmailAndPassword({ email, password });

    if (!ok) return dispatch(logout(errorMessage));
    dispatch(login({ ok, uid, email, displayName, photoURL }));
  };
};
export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    //resetear el estado inicial
    dispatch(clearFavorites());
    dispatch(clearCart());
    dispatch(clearAddresses());
    dispatch(clearPurchases());
    dispatch(clearCards());
    dispatch(clearPaymentMethod());
    dispatch(clearActiveAddress());
    //Logout
    dispatch(logout());
  };
};
export const startChangingEmail = (newEmail, password) => {
  return async (dispatch, getState) => {
    const { email: oldEmail } = getState().auth;
    const { ok, email, errorMessage } = await changeEmail(
      oldEmail,
      newEmail,
      password
    );
    if (!ok && errorMessage) {
      dispatch(isError({ errorMessage }));
      return;
    }

    dispatch(updateEmail(email));
    dispatch(isError(""));
    dispatch(isSuccess(true));
  };
};
export const startChangingDisplayName = (newDisplayName) => {
  return async (dispatch) => {
    const { ok, displayName, errorMessage } = await changeDisplayName(
      newDisplayName
    );
    if (!ok && errorMessage) return dispatch(isError({ errorMessage }));
    dispatch(isError(""));
    dispatch(updateDisplayName(displayName));
    dispatch(isSuccess(true));
  };
};
export const startChangingPassword = (oldPassword, newPassword) => {
  return async (dispatch, getState) => {
    const { email } = getState().auth;
    const { ok, password, errorMessage } = await changePassword(
      email,
      oldPassword,
      newPassword
    );
    if (!ok && errorMessage) {
      dispatch(isError({ errorMessage }));
      return;
    }

    dispatch(isError(""));
    dispatch(isSuccess(true));
  };
};
