import { getCollection } from "astro:content";

export type ServicesFormValues = {
  access: boolean;
  botField: boolean;
  name: string | null;
  email: string | null;
  info: string | null;
  selectedService: string | null;
};

export const services = [...(await getCollection("services"))].sort(
  (a, b) => a.data.order - b.data.order,
);

export const servicesLinks = services
  .sort((a, b) => a.data.order - b.data.order)
  .map(({ data: { title }, slug, collection }) => ({
    text: title,
    href: `/${collection}/${slug.split("/")[1]}`,
  }));

export const servicesOptions = services.map(
  ({ slug, data: { title: value } }) => ({
    slug,
    value,
    disabled: false,
  }),
);
