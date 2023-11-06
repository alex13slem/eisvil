import type { CollectionEntry } from "astro:content";
import { atom } from "nanostores";

export const pubTabIdx = atom(1);
export const publishingData = atom<CollectionEntry<"publishing">[]>([]);

export function moveRight() {
  console.log("right");
  const movedEl = publishingData.value?.pop();
  movedEl && publishingData.set([movedEl, ...publishingData.get()]);
}
export function moveLeft() {
  console.log("left");
  const movedEl = publishingData.value?.shift();
  movedEl && publishingData.set([...publishingData.get(), movedEl]);
}
