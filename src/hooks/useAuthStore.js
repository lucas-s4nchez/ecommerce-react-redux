import { useDispatch, useSelector } from "react-redux";
import {
  changeDisplayName,
  changeEmail,
  changePassword,
  loginWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/providers";
import {
  checkingCredentials,
  isError,
  isSuccess,
  login,
  logout,
  updateDisplayName,
  updateEmail,
} from "../store/auth/authSlice";
import { clearUserInfo, isDisabled } from "../store/user/userSlice";

export const useAuthStore = () => {
  const {
    uid,
    email,
    displayName,
    photoURL,
    errorMessage,
    status,
    successUpdate,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startGoogleSigIn = async () => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    // if (!result.ok && result.errorMessage) {
    //   dispatch(isError(result));
    // }
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
  const startRegisterUserwithEmailAndPassword = async ({
    email,
    password,
    displayName,
  }) => {
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
  const startLoginWithEmailAndPassword = async ({ email, password }) => {
    dispatch(checkingCredentials());

    const { ok, uid, displayName, photoURL, errorMessage } =
      await loginWithEmailAndPassword({ email, password });

    if (!ok) return dispatch(logout(errorMessage));
    dispatch(login({ ok, uid, email, displayName, photoURL }));
  };
  const startLogout = async () => {
    await logoutFirebase();
    //resetear el estado inicial
    dispatch(clearUserInfo());
    //Logout
    dispatch(logout());
  };

  const startChangingEmail = async (newEmail, password) => {
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
  const startChangingDisplayName = async (newDisplayName) => {
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

  return {
    //Propiedades
    uid,
    email,
    displayName,
    photoURL,
    errorMessage,
    status,
    successUpdate,

    //Métodos
    startGoogleSigIn,
    startRegisterUserwithEmailAndPassword,
    startLoginWithEmailAndPassword,
    startLogout,
    startChangingEmail,
    startChangingDisplayName,
  };
};
