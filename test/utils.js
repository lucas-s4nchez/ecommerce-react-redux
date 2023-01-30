import { doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../src/firebase/config";
import { productsStock } from "./fixtures/productsFixtures";

export const setData = async () => {
  const product1 = productsStock[0];
  const product2 = productsStock[1];
  await setDoc(doc(FirebaseDB, "products", `prod-1`), product1);
  await setDoc(doc(FirebaseDB, "products", `prod-2`), product2);
};
