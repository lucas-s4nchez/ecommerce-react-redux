import {
  authSlice,
  checkingCredentials,
  isError,
  isSuccess,
  login,
  logout,
  updateDisplayName,
  updateEmail,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  initialState,
  testUser,
} from "../../fixtures/authFixtures";

describe('Pruebas en el archivo "authSlice.js"', () => {
  test('El slice debe de tener el name "auth"', () => {
    const stateName = authSlice.name;

    expect(stateName).toBe("auth");
  });

  test("Debe de retornar el estado inicial", () => {
    //Le pasamos el estado y la accion al reducer
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test("Debe de realizar la autenticación", () => {
    //Le pasamos el estado y la accion al reducer
    const state = authSlice.reducer(initialState, login(testUser));

    expect(state).toEqual({
      status: "authenticated",
      uid: testUser.uid,
      email: testUser.email,
      displayName: testUser.displayName,
      photoURL: testUser.photoURL,
      errorMessage: "",
      successUpdate: false,
    });
  });

  test("Debe de realizar el logout CON mensaje de error", () => {
    const errorMessage = "Las credenciales no son válidas";
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage: errorMessage })
    );

    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: state.errorMessage,
      successUpdate: false,
    });
  });

  test("Debe de realizar el logout SIN mensaje de error", () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: "",
      successUpdate: false,
    });
  });

  test('Debe de cambiar la propiedad "status" a "checking"', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    expect(state.status).toBe("checking");
  });

  test("Debe de cambiar la propiedad 'errorMessage'", () => {
    const errorMessage = "Hola soy un error";
    const state = authSlice.reducer(
      authenticatedState,
      isError({ errorMessage: errorMessage })
    );

    expect(state.errorMessage).toBe(errorMessage);
  });

  test("Debe de cambiar la propiedad 'successUpdated'", () => {
    const state = authSlice.reducer(authenticatedState, isSuccess(true));

    expect(state.successUpdate).toBe(true);
  });

  test("Debe de cambiar la propiedad 'email'", () => {
    const newEmail = "newtest@google.com";
    const state = authSlice.reducer(authenticatedState, updateEmail(newEmail));

    expect(state.email).toBe(newEmail);
  });

  test("Debe de cambiar la propiedad 'displayName'", () => {
    const newDisplayName = "New Test User";
    const state = authSlice.reducer(
      authenticatedState,
      updateDisplayName(newDisplayName)
    );

    expect(state.displayName).toBe(newDisplayName);
  });
});
