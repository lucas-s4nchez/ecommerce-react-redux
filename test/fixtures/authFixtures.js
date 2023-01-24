export const initialState = {
  status: "checking", //checking, not-authenticated, authenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: "",
  successUpdate: false,
};

export const authenticatedState = {
  status: "authenticated", //checking, not-authenticated, authenticated
  uid: "123ABC",
  email: "demo@google.com",
  displayName: "Demo User",
  photoURL: "https://demo.jpg",
  errorMessage: "",
  successUpdate: false,
};

export const notAuthenticatedState = {
  status: "not-authenticated", //checking, not-authenticated, authenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: "",
  successUpdate: false,
};

export const testUser = {
  uid: "123ABC",
  email: "test@google.com",
  displayName: "Test User",
  photoURL: "https://test.jpg",
};
