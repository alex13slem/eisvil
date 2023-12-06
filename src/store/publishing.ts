import type { CollectionEntry } from "astro:content";
import { atom } from "nanostores";

export const activeIdx = atom(1);
export const offsetIdx = atom(1);
export const slidingProcess = atom(false);
export const initLeft = atom(false);

export type SlideData = CollectionEntry<"publishing"> & {
  infIdx: number;
};

export function moveLeft(slides: any[]) {
  if (slidingProcess.get() === true) return;

  slidingProcess.set(true);
  initLeft.set(true);
  offsetIdx.set(offsetIdx.get() - 1);

  if (activeIdx.get() - 1 < 0) activeIdx.set(slides.length - 1);
  else activeIdx.set(activeIdx.get() - 1);

  const firstElemIdx = slides[0].infIdx;
  const removedSlide = {
    ...[...slides].pop(),
    infIdx: firstElemIdx - 1,
  } as SlideData;

  slides.unshift(removedSlide);

  setTimeout(() => {
    slides.pop();
    slidingProcess.set(false);
  }, 700);
}

export function moveRight(slides: any[]) {
  if (slidingProcess.get() === true) return;

  slidingProcess.set(true);
  initLeft.set(false);
  offsetIdx.set(offsetIdx.get() + 1);

  if (activeIdx.get() + 1 > slides.length - 1) activeIdx.set(0);
  else activeIdx.set(activeIdx.get() + 1);

  const lastElem = [...slides].pop() as SlideData;
  const lastElemIdx = lastElem.infIdx;
  const removedSlide = {
    ...slides[0],
    infIdx: lastElemIdx + 1,
  } as SlideData;

  slides.push(removedSlide);

  setTimeout(() => {
    slides.shift();
    slides = slides;
    slidingProcess.set(false);
  }, 700);
}
