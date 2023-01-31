import {
  changeDisplayName,
  changeEmail,
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
  startGoogleSigIn,
  startLoginWithEmailAndPassword,
  startLogout,
  startRegisterUserwithEmailAndPassword,
} from "../../../src/store/auth/authThunks";
import {
  clearUserInfo,
  isDisabled,
  isLoadingUserInfo,
  setAddresses,
  setCards,
  setCart,
  setFavorites,
  setPurchases,
  setTotalItemsInCart,
  setTotalToPay,
} from "../../../src/store/user/userSlice";
import {
  startAddingProductToFavorites,
  startLoadingUserInfo,
} from "../../../src/store/user/userThunks";
import { testUser } from "../../fixtures/authFixtures";

//mock con las funciones propias de firebase
jest.mock("../../../src/firebase/providers.js");

describe("Pruebas en authThunks.js", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("startGoogleSigIn debe de disparar las acciones que corresponde (Éxito)", async () => {
    const loginData = { ok: true, ...testUser };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSigIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSigIn debe de disparar las acciones que corresponde (Error)", async () => {
    const logoutData = {
      ok: false,
      errorMessage: "Ocurrió un error con Google",
    };
    await signInWithGoogle.mockResolvedValue(logoutData);

    await startGoogleSigIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(logoutData.errorMessage));
  });

  test("startRegisterUserwithEmailAndPassword debe de disparar las acciones que corresponde (Éxito)", async () => {
    const formData = {
      email: testUser.email,
      displayName: testUser.displayName,
      password: "123456",
    };
    const loginData = { ok: true, ...testUser };
    await registerUserWithEmailAndPassword.mockResolvedValue(loginData);

    await startRegisterUserwithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startRegisterUserwithEmailAndPassword debe de disparar las acciones que corresponde (Error)", async () => {
    const formData = {
      email: testUser.email,
      displayName: testUser.displayName,
      password: "123456",
    };
    const logoutData = { ok: false, errorMessage: "Ocurrió un error" };
    await registerUserWithEmailAndPassword.mockResolvedValue(logoutData);

    await startRegisterUserwithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(logoutData.errorMessage));
  });

  test("startLoginWithEmailAndPassword debe de disparar las acciones que corresponde (Éxito)", async () => {
    const loginData = { ok: true, ...testUser };
    const formData = { email: testUser.email, password: "123456" };

    await loginWithEmailAndPassword.mockResolvedValue(loginData);

    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startLoginWithEmailAndPassword debe de disparar las acciones que corresponde (Error)", async () => {
    const logoutData = { ok: false, errorMessage: "Ocurrió un error" };
    const formData = { email: testUser.email, password: "123456" };

    await loginWithEmailAndPassword.mockResolvedValue(logoutData);

    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(logoutData.errorMessage));
  });

  test("startLogout debe de disparar las acciones que corresponde ", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearUserInfo());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });

  test("startChangingEmail debe de disparar las acciones que corresponde (Éxito)", async () => {
    const email = testUser.email;
    const newEmail = "newemail@google.com";
    const password = "123456";
    const successResult = {
      ok: true,
      updatedEmail: newEmail,
      errorMessage: "",
    };
    getState.mockReturnValue({ auth: { email: email } });
    await changeEmail.mockReturnValue(successResult);

    await startChangingEmail(newEmail, password)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(isDisabled());
    expect(dispatch).toHaveBeenCalledWith(
      updateEmail(successResult.updatedEmail)
    );
    expect(dispatch).toHaveBeenCalledWith(isError(""));
    expect(dispatch).toHaveBeenCalledWith(isSuccess(true));
    expect(dispatch).toHaveBeenCalledWith(isDisabled());
  });

  test("startChangingEmail debe de disparar las acciones que corresponde (Error)", async () => {
    const email = testUser.email;
    const newEmail = "newemail@google.com";
    const password = "123456";
    const failResult = {
      ok: false,
      errorMessage: "Ocurrió un error",
    };
    getState.mockReturnValue({ auth: { email: email } });
    await changeEmail.mockReturnValue(failResult);

    await startChangingEmail(newEmail, password)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(isDisabled());
    expect(dispatch).toHaveBeenCalledWith(
      isError({ errorMessage: failResult.errorMessage })
    );
    expect(dispatch).toHaveBeenCalledWith(isDisabled());
  });

  test("startChangingDisplayName debe de disparar las acciones que corresponde (Éxito)", async () => {
    const newDisplayName = "New Test User";
    const successResult = {
      ok: true,
      displayName: newDisplayName,
      errorMessage: "",
    };
    await changeDisplayName.mockReturnValue(successResult);

    await startChangingDisplayName(newDisplayName)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(isDisabled());
    expect(dispatch).toHaveBeenCalledWith(
      updateDisplayName(successResult.displayName)
    );
    expect(dispatch).toHaveBeenCalledWith(isError(""));
    expect(dispatch).toHaveBeenCalledWith(isSuccess(true));
    expect(dispatch).toHaveBeenCalledWith(isDisabled());
  });

  test("startChangingDisplayName debe de disparar las acciones que corresponde (Error)", async () => {
    const newDisplayName = "New Test User";
    const failResult = {
      ok: false,
      errorMessage: "Ocurrió un error",
    };
    await changeDisplayName.mockReturnValue(failResult);

    await startChangingDisplayName(newDisplayName)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(isDisabled());
    expect(dispatch).toHaveBeenCalledWith(
      isError({ errorMessage: failResult.errorMessage })
    );
  });
});
