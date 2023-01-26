import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

const googleProvider = new GoogleAuthProvider();

//Para que aparezca la ventana para seleccionar una cuenta de google
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    const { displayName, email, photoURL, uid } = result.user;
    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const registerUserWithEmailAndPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    //actualizar el displayName en firebase
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return { ok: true, uid, photoURL, email, displayName };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = resp.user;

    return { ok: true, uid, photoURL, email, displayName };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};

export const changePassword = async (email, password, newPassword) => {
  try {
    await signInWithEmailAndPassword(FirebaseAuth, email, password);
    await updatePassword(FirebaseAuth.currentUser, newPassword);
    return { ok: true, password: newPassword };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const changeEmail = async (oldEmail, newEmail, password) => {
  try {
    await signInWithEmailAndPassword(FirebaseAuth, oldEmail, password);
    await updateEmail(FirebaseAuth.currentUser, newEmail);
    return { ok: true, updatedEmail: newEmail };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const changeDisplayName = async (newDisplayName) => {
  try {
    await updateProfile(FirebaseAuth.currentUser, { newDisplayName });
    return { ok: true, displayName: newDisplayName };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};
