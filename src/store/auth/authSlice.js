import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "checking", //checking, not-authenticated, authenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: "",
  // error: false,
  successUpdate: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = "";
      // state.error = false;
      state.successUpdate = false;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload;
      // state.error = false;
      state.successUpdate = false;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    // hasError: (state, { payload }) => {
    //   state.error = payload;
    // },
    isError: (state, { payload }) => {
      state.errorMessage = payload.errorMessage;
    },
    isSuccess: (state, { payload }) => {
      state.successUpdate = payload;
    },
    updateEmail: (state, { payload }) => {
      state.email = payload;
    },
    updateDisplayName: (state, { payload }) => {
      state.displayName = payload;
    },
  },
});

export const {
  login,
  logout,
  checkingCredentials,
  // hasError,
  isError,
  isSuccess,
  updateEmail,
  updateDisplayName,
} = authSlice.actions;

export default authSlice.reducer;
