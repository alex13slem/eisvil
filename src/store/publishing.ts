import { getCollection, type CollectionEntry } from "astro:content";
import { atom } from "nanostores";

const DELAY_BETWEEN_SLIDE = 750;

export type SlideData = CollectionEntry<"publishing"> & {
  infIdx: number;
};

export type PublishingFormValues = {
  accessSecure: boolean;
  accessUser: boolean;
  botField: boolean;
  name: string | null;
  email: string | null;
  linkPreview: string | null;
  linkBuild: string | null;
  info: string | null;
  selectedDir: string | null;
};

export const publishings = [...(await getCollection("publishing"))].sort(
  (a, b) => a.data.order - b.data.order,
);

export const publishingLinks = publishings
  .sort((a, b) => a.data.order - b.data.order)
  .map(({ data: { title }, slug, collection }) => ({
    text: title,
    href: `/${collection}/${slug.split("/")[1]}`,
  }));

export const publishingOptions = publishings.map(
  ({ slug, data: { title: value } }) => ({
    slug,
    value,
    disabled: false,
  }),
);

export const slides = atom(
  publishings.map<SlideData>((el) => ({
    ...el,
    infIdx: el.data.order - 1,
  })),
);
export const activeIdx = atom(1);
export const shiftIdx = atom(0);
export const slidingProcess = atom(false);
export const initLeft = atom(false);

export function moveRight() {
  slidingProcess.set(true);
  initLeft.set(true);
  shiftIdx.set(shiftIdx.get() + 1);

  if (activeIdx.get() - 1 < 0) {
    activeIdx.set(slides.get().length - 1);
  } else {
    activeIdx.set(activeIdx.get() - 1);
  }

  const infIdx = slides.get()[0].infIdx - 1;
  const removedSlide = { ...slides.get()[slides.get().length - 1], infIdx };

  slides.set([removedSlide, ...slides.get()]);

  setTimeout(() => {
    slides.set(slides.get().slice(0, -1));
    slidingProcess.set(false);
  }, DELAY_BETWEEN_SLIDE);
}

export function moveLeft() {
  slidingProcess.set(true);
  initLeft.set(false);
  shiftIdx.set(shiftIdx.get() - 1);

  if (activeIdx.get() + 1 > slides.get().length - 1) {
    activeIdx.set(0);
  } else {
    activeIdx.set(activeIdx.get() + 1);
  }

  const infIdx = slides.get()[slides.get().length - 1].infIdx + 1;
  const removedSlide = { ...slides.get()[0], infIdx };

  slides.set([...slides.get(), removedSlide]);

  setTimeout(() => {
    slides.set(slides.get().slice(1, slides.get().length));
    slidingProcess.set(false);
  }, DELAY_BETWEEN_SLIDE);
}
