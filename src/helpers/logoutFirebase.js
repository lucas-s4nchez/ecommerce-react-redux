import { FirebaseAuth } from "../firebase/config";

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
