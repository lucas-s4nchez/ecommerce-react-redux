import { updateProfile } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

export const changeDisplayName = async (newDisplayName) => {
  try {
    await updateProfile(FirebaseAuth.currentUser, { newDisplayName });
    return { ok: true, displayName: newDisplayName };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};
