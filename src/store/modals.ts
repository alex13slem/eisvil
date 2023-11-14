import { atom } from "nanostores";

export const servicesModalForm = atom<{
  isOpen: boolean;
  slug: string | null;
}>({ isOpen: false, slug: null });

export const publishingModalForm = atom<{
  isOpen: boolean;
  slug: string | null;
}>({ isOpen: false, slug: null });
