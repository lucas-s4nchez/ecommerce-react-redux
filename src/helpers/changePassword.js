import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

export const changePassword = async (email, password, newPassword) => {
  try {
    await signInWithEmailAndPassword(FirebaseAuth, email, password);
    await updatePassword(FirebaseAuth.currentUser, newPassword);
    return { ok: true, password: newPassword };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};
