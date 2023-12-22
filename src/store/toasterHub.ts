import { atom, onSet } from "nanostores";
import { areSetsEqual } from "../utils/helpers";

export const toasterHub = atom<string[]>([]);

onSet(toasterHub, ({ newValue, abort }) => {
  if (areSetsEqual(new Set(toasterHub.get()), new Set([...newValue]))) {
    return abort();
  }
});

toasterHub.subscribe((value) => {
  if (value.length) {
    setTimeout(() => {
      toasterHub.set(value.slice(0, value.length - 1));
    }, 3000);
  }
});
