import { signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

export const changeEmail = async (oldEmail, newEmail, password) => {
  try {
    await signInWithEmailAndPassword(FirebaseAuth, oldEmail, password);
    await updateEmail(FirebaseAuth.currentUser, newEmail);
    return { ok: true, email: newEmail };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};
