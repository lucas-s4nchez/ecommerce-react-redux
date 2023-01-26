import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import {
  loginWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../src/firebase/providers";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store/auth/authSlice";
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
  testUser,
} from "../fixtures/authFixtures";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

jest.mock("../../src/firebase/providers");

describe("Pruebas en useAuthStore", () => {
  beforeEach(() => jest.clearAllMocks());

  test("debe de regresar los valores por defecto", () => {
    const mockStore = getMockStore({ ...initialState });

    //Como renderizar un hook con un store de redux
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: "",
      status: "checking",
      successUpdate: false,
      startGoogleSigIn: expect.any(Function),
      startRegisterUserwithEmailAndPassword: expect.any(Function),
      startLoginWithEmailAndPassword: expect.any(Function),
      startLogout: expect.any(Function),
      startChangingEmail: expect.any(Function),
      startChangingDisplayName: expect.any(Function),
      startChangingPassword: expect.any(Function),
    });
  });

  test("startGoogleSigIn debe de realizar el login con google correctamente", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const loginDataResults = { ok: true, ...testUser };
    await signInWithGoogle.mockResolvedValue(loginDataResults);

    await act(async () => {
      await result.current.startGoogleSigIn();
    });

    const { uid, email, displayName, status, errorMessage } = result.current;
    expect({ uid, email, displayName, status, errorMessage }).toEqual({
      uid: testUser.uid,
      email: testUser.email,
      displayName: testUser.displayName,
      errorMessage: "",
      status: "authenticated",
    });
  });

  test("startGoogleSigIn debe de fallar y mostrar el mensaje de error", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const logoutDataResults = { ok: false, errorMessage: "Ocurrió un error" };
    await signInWithGoogle.mockResolvedValue(logoutDataResults);

    await act(async () => {
      await result.current.startGoogleSigIn();
    });
    const { uid, email, displayName, status, errorMessage } = result.current;
    expect({ uid, email, displayName, status, errorMessage }).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      errorMessage: logoutDataResults.errorMessage,
    });
  });

  test("startRegisterUserwithEmailAndPassword debe de crear el usuario y hacer el login correctamente", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const registerDataResults = { ok: true, ...testUser };
    const formData = {
      email: testUser.email,
      password: "123456",
      displayName: testUser.displayName,
    };
    await registerUserWithEmailAndPassword.mockResolvedValue(
      registerDataResults
    );

    await act(async () => {
      await result.current.startRegisterUserwithEmailAndPassword(formData);
    });

    const { uid, email, displayName, status, errorMessage } = result.current;
    expect({ uid, email, displayName, status, errorMessage }).toEqual({
      uid: testUser.uid,
      email: testUser.email,
      displayName: testUser.displayName,
      status: "authenticated",
      errorMessage: "",
    });
  });

  test("startRegisterUserwithEmailAndPassword debe de fallar y mostrar el mensaje de error", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const registerDataResults = { ok: false, errorMessage: "Ocurrió un error" };
    const formData = {
      email: testUser.email,
      password: "123456",
      displayName: testUser.displayName,
    };
    await registerUserWithEmailAndPassword.mockResolvedValue(
      registerDataResults
    );

    await act(async () => {
      await result.current.startRegisterUserwithEmailAndPassword(formData);
    });

    const { uid, email, displayName, status, errorMessage } = result.current;
    expect({ uid, email, displayName, status, errorMessage }).toEqual({
      uid: null,
      email: null,
      displayName: null,
      status: "not-authenticated",
      errorMessage: registerDataResults.errorMessage,
    });
  });

  test("startLoginWithEmailAndPassword debe de realizar el login con correo y contraseña", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const loginDataResults = { ok: true, ...testUser };
    const formData = {
      email: testUser.email,
      password: "123456",
    };
    await loginWithEmailAndPassword.mockResolvedValue(loginDataResults);

    await act(async () => {
      await result.current.startLoginWithEmailAndPassword(formData);
    });

    const { uid, email, displayName, status, errorMessage } = result.current;
    expect({ uid, email, displayName, status, errorMessage }).toEqual({
      uid: testUser.uid,
      email: testUser.email,
      displayName: testUser.displayName,
      errorMessage: "",
      status: "authenticated",
    });
  });

  test("startLoginWithEmailAndPassword debe de fallar el login con correo y contraseña", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const loginDataResults = { ok: false, errorMessage: "Ocurrió un error" };
    const formData = {
      email: testUser.email,
      password: "123456",
    };
    await loginWithEmailAndPassword.mockResolvedValue(loginDataResults);

    await act(async () => {
      await result.current.startLoginWithEmailAndPassword(formData);
    });

    const { uid, email, displayName, status, errorMessage } = result.current;
    expect({ uid, email, displayName, status, errorMessage }).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      errorMessage: loginDataResults.errorMessage,
    });
  });

  test("startLogout debe de realizar el logout", async () => {
    const mockStore = getMockStore({ ...authenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogout();
    });

    const { uid, email, displayName, status, errorMessage } = result.current;
    expect({ uid, email, displayName, status, errorMessage }).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      errorMessage: "",
    });
  });
});
