import {
  changeDisplayName,
  changeEmail,
  changePassword,
  loginWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../../src/firebase/providers";
import {
  checkingCredentials,
  isError,
  isSuccess,
  login,
  logout,
  updateDisplayName,
  updateEmail,
} from "../../../src/store/auth/authSlice";
import {
  startChangingDisplayName,
  startChangingEmail,
  startChangingPassword,
  startGoogleSigIn,
  startLoginWithEmailAndPassword,
  startLogout,
  startRegisterUserwithEmailAndPassword,
} from "../../../src/store/auth/authThunks";
import {
  clearActiveAddress,
  clearAddresses,
  clearCards,
  clearCart,
  clearFavorites,
  clearPaymentMethod,
  clearPurchases,
  clearUserInfo,
  disabled,
} from "../../../src/store/user/userSlice";
import { testUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe('Pruebas en el archivo "authThunks.js"', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("'startGoogleSigIn' debe de disparar las acciones 'chekingCredentials' y 'login' (Éxito)", async () => {
    const loginDataResults = { ok: true, ...testUser };
    await signInWithGoogle.mockResolvedValue(loginDataResults);

    //Emular un thunk que dispara acciones asincronas
    await startGoogleSigIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginDataResults));
  });

  test("'startGoogleSigIn' debe de disparar las acciones 'chekingCredentials' y 'logout' (Error)", async () => {
    const logoutDataResults = { ok: false, errorMessage: "Ocurrió un error" };
    await signInWithGoogle.mockResolvedValue(logoutDataResults);

    //Emular un thunk que dispara acciones asincronas
    await startGoogleSigIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(isError(logoutDataResults));
    expect(dispatch).toHaveBeenCalledWith(logout());
  });

  test("'startRegisterUserwithEmailAndPassword' debe de disparar las acciones 'chekingCredentials' y 'login' (Éxito)", async () => {
    const loginDataResults = { ok: true, ...testUser };
    const formData = {
      email: testUser.email,
      password: "123456",
      displayName: testUser.displayName,
    };
    await registerUserWithEmailAndPassword.mockResolvedValue(loginDataResults);

    //Emular un thunk que dispara acciones asincronas
    await startRegisterUserwithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginDataResults));
  });

  test("'startRegisterUserwithEmailAndPassword' debe de disparar las acciones 'chekingCredentials' y 'logout' (Error)", async () => {
    const logoutDataResults = {
      ok: false,
      errorMessage: "Ocurrió un error al crear la cuenta",
    };
    const formData = {
      email: testUser.email,
      password: "123456",
      displayName: testUser.displayName,
    };

    await registerUserWithEmailAndPassword.mockResolvedValue(logoutDataResults);

    //Emular un thunk que dispara acciones asincronas
    await startRegisterUserwithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout(logoutDataResults.errorMessage)
    );
  });

  test("'startLoginWithEmailAndPassword' debe de disparar las acciones 'chekingCredentials' y 'login' (Éxito)", async () => {
    const loginDataResults = { ok: true, ...testUser };
    const formData = { email: testUser.email, password: "123456" };

    await loginWithEmailAndPassword.mockResolvedValue(loginDataResults);

    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginDataResults));
  });

  test("'startLoginWithEmailAndPassword' debe de disparar las acciones 'chekingCredentials' y 'logout' (Error)", async () => {
    const logoutDataResults = { ok: false, errorMessage: "Ocurrió un error" };
    const formData = { email: testUser.email, password: "123456" };

    await loginWithEmailAndPassword.mockResolvedValue(logoutDataResults);

    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout(logoutDataResults.errorMessage)
    );
  });

  test("'startLogout' debe de llamar a 'logoutFirebase' y disparar todas las acciones que resetean el estado", async () => {
    await startLogout()(dispatch);

    expect(dispatch).toHaveBeenCalled(logoutFirebase());
    expect(dispatch).toHaveBeenCalledWith(clearUserInfo());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });

  test('"startChangingEmail" debe de disparar las acciones: "updateEmail", "isError", "isSuccess" y "disabled" (Éxito) ', async () => {
    getState.mockReturnValue({ auth: { email: testUser.email } });

    const formData = { newEmail: "NewTest@google.com", password: "123456" };
    const changingEmailResults = { ok: true, email: formData.newEmail };

    await changeEmail.mockResolvedValue(changingEmailResults);

    await startChangingEmail(formData)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      updateEmail(changingEmailResults.email)
    );
    expect(dispatch).toHaveBeenCalledWith(isError(""));
    expect(dispatch).toHaveBeenCalledWith(isSuccess(true));
    expect(dispatch).toHaveBeenCalledWith(disabled());
  });

  test('"startChangingEmail" debe de disparar las acciones:  "isError" y "disabled" (Error) ', async () => {
    getState.mockReturnValue({ auth: { email: testUser.email } });

    const formData = { newEmail: "NewTest@google.com", password: "123456" };
    const changingEmailResults = {
      ok: false,
      errorMessage: "Ocurrió un error",
    };

    await changeEmail.mockResolvedValue(changingEmailResults);

    await startChangingEmail(formData)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      isError({ errorMessage: changingEmailResults.errorMessage })
    );
    expect(dispatch).toHaveBeenCalledWith(disabled());
  });

  test('"startChangingPassword" debe de disparar las acciones: "isError", "isSuccess" y "disabled" (Éxito) ', async () => {
    getState.mockReturnValue({ auth: { email: testUser.email } });

    const formData = { password: "123456", newPassword: "1234567" };
    const changingPasswordResults = {
      ok: true,
      password: formData.newPassword,
    };

    await changePassword.mockResolvedValue(changingPasswordResults);

    await startChangingPassword(formData)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(isError(""));
    expect(dispatch).toHaveBeenCalledWith(isSuccess(true));
    expect(dispatch).toHaveBeenCalledWith(disabled());
  });

  test('"startChangingPassword" debe de disparar las acciones: "isError" y "disabled" (Error) ', async () => {
    getState.mockReturnValue({ auth: { email: testUser.email } });

    const formData = { password: "123456", newPassword: "1234567" };
    const changingPasswordResults = {
      ok: false,
      errorMessage: "Ocurrió un error",
    };

    await changePassword.mockResolvedValue(changingPasswordResults);

    await startChangingPassword(formData)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      isError({ errorMessage: changingPasswordResults.errorMessage })
    );
    expect(dispatch).toHaveBeenCalledWith(disabled());
  });

  test('"startChangingDisplayName" debe de disparar las acciones: "isError", "updateDisplayName" ,"isSuccess" y "disabled" (Éxito) ', async () => {
    const formData = { newDisplayName: "New Test User" };
    const changingDisplayNameResults = {
      ok: true,
      displayName: formData.newDisplayName,
    };

    await changeDisplayName.mockResolvedValue(changingDisplayNameResults);

    await startChangingDisplayName(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(isError(""));
    expect(dispatch).toHaveBeenCalledWith(
      updateDisplayName(changingDisplayNameResults.displayName)
    );
    expect(dispatch).toHaveBeenCalledWith(isSuccess(true));
    expect(dispatch).toHaveBeenCalledWith(disabled());
  });

  test('"startChangingDisplayName" debe de disparar las acciones: "isError" y "disabled" (Error) ', async () => {
    const formData = { newDisplayName: "New Test User" };
    const changingDisplayNameResults = {
      ok: false,
      errorMessage: "Ocurrió un error",
    };

    await changeDisplayName.mockResolvedValue(changingDisplayNameResults);

    await startChangingDisplayName(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      isError({ errorMessage: changingDisplayNameResults.errorMessage })
    );
    expect(dispatch).toHaveBeenCalledWith(disabled());
  });
});
