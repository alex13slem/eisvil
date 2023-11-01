import { z } from "astro/zod";

export const servicesSchema = z.object({
  title: z.string(),
  images: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
    }),
  ),
  link: z.string().url().optional(),
  order: z.number(),
});
