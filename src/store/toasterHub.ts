import { action, atom, onSet } from "nanostores";
import { areSetsEqual } from "../utils/helpers";

export const toasterHub = atom<string[]>([]);

onSet(toasterHub, ({ newValue, abort }) => {
  if (areSetsEqual(new Set(toasterHub.get()), new Set([...newValue]))) {
    return abort();
  }
  removeToast();
});

let removeProcess = false;
const removeToast = action(toasterHub, "removeToast", ({ set, get }) => {
  if (removeProcess) return;
  removeProcess = true;
  setTimeout(() => {
    set(get().slice(0, get().length - 1));
    removeProcess = false;
  }, 3000);
});
