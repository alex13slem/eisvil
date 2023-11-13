import { atom } from "nanostores";

export const servicesModalForm = atom<{
  isOpen: boolean;
  target: string | null;
}>({ isOpen: false, target: null });

export const publishingModalForm = atom<{
  isOpen: boolean;
  target: string | null;
}>({ isOpen: false, target: null });
