import localforage from "localforage";
import { atom } from "nanostores";

export const blogerFormSubmitted = atom<boolean>(false);

try {
  const submitted = await localforage.getItem("blogerFormSubmitted");
  if (submitted) {
    blogerFormSubmitted.set(true);
  }
} catch (error) {
  console.error(error);
}
