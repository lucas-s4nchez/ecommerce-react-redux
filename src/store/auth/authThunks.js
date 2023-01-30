import {
  changeDisplayName,
  changeEmail,
  loginWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { clearUserInfo, isDisabled } from "../user/userSlice";
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
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok) return dispatch(logout(result.errorMessage));

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
    dispatch(clearUserInfo());
    //Logout
    dispatch(logout());
  };
};
export const startChangingEmail = (newEmail, password) => {
  return async (dispatch, getState) => {
    const { email } = getState().auth;
    dispatch(isDisabled());
    const { ok, updatedEmail, errorMessage } = await changeEmail(
      email,
      newEmail,
      password
    );
    if (!ok && errorMessage) {
      dispatch(isDisabled());
      dispatch(isError({ errorMessage }));
      return;
    }

    dispatch(updateEmail(updatedEmail));
    dispatch(isError(""));
    dispatch(isSuccess(true));
    dispatch(isDisabled());
  };
};
export const startChangingDisplayName = (newDisplayName) => {
  return async (dispatch) => {
    dispatch(isDisabled());
    const { ok, displayName, errorMessage } = await changeDisplayName(
      newDisplayName
    );
    if (!ok && errorMessage) {
      dispatch(isDisabled());
      dispatch(isError({ errorMessage }));
      return;
    }
    dispatch(isError(""));
    dispatch(updateDisplayName(displayName));
    dispatch(isSuccess(true));
    dispatch(isDisabled());
  };
};
