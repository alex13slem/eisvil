import { normaliseStrapiResponse } from "@/strapi-client/normalize";
import type { StrapiEntity, StrapiPaginatedArray } from "@/types/strapi";

export const cn = (...cNames: any): string =>
  cNames.filter(Boolean, String).join(" ");

export const createWrapperAndAppendToBody = (
  wrapperId: string,
  cn?: string,
): HTMLDivElement => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  cn ? (wrapperElement.className = cn) : null;
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

async function fetchStrapi<Fields>(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  const norm = normaliseStrapiResponse(data) as Fields;
  return norm;
}

export async function fetchStrapiOne<Fields>(type: string, id: string) {
  const url = `${import.meta.env.PUBLIC_API}/${type}/${id}?populate=deep`;
  return await fetchStrapi<Fields & StrapiEntity>(url);
}

export async function fetchStrapiMany<Fields>(type: string) {
  const url = `${import.meta.env.PUBLIC_API}/${type}?populate=deep`;
  return await fetchStrapi<StrapiPaginatedArray<StrapiEntity & Fields>>(url);
}

export const formatErrors = (error: { _errors: string[] }) =>
  error._errors.join(", ");

export const formatStrToId = (string: string) => string.split(" ").join("-");

export function getRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}
