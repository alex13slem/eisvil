import { getCollection } from "astro:content";

export const services = [...(await getCollection("services"))].sort(
  (a, b) => a.data.order - b.data.order,
);

export const servicesLinks = services
  .sort((a, b) => a.data.order - b.data.order)
  .map(({ data: { title }, slug, collection }) => ({
    text: title,
    href: `/${collection}/${slug.split("/")[1]}`,
  }));
