import { action, atom, onSet } from "nanostores";

export const toasterHub = atom<string[]>([]);

let timeoutIdx: number | null = null;

onSet(toasterHub, () => {
  timeoutIdx && clearTimeout(timeoutIdx);
  removeToast({ duration: 3 });
});

const removeToast = action(
  toasterHub,
  "removeToast",

  ({ set, get }, { duration }: { duration: number }) => {
    timeoutIdx = setTimeout(() => {
      set(get().slice(0, get().length - 1));
    }, duration * 1000);
  },
);
