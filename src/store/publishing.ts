import type { CollectionEntry } from "astro:content";
import { atom } from "nanostores";

export const pubTabIdx = atom(1);
export const offsetIdx = atom(1);
export const slidingProcess = atom(false);
export const initLeft = atom(false);

export type SlideData = CollectionEntry<"publishing"> & {
  infIdx: number;
};
