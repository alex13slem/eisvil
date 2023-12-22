import { atom, onSet } from "nanostores";
import { areSetsEqual } from "../utils/helpers";

export const toasterHub = atom<string[]>([]);

onSet(toasterHub, ({ newValue, abort }) => {
  if (areSetsEqual(new Set(toasterHub.get()), new Set([...newValue]))) {
    return abort();
  }
});

toasterHub.subscribe(() => {
  if (toasterHub.get().length) {
    setTimeout(() => {
      toasterHub.set(toasterHub.get().slice(0, toasterHub.get().length - 1));
    }, 3000);
  }
});
