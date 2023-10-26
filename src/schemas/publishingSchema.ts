import { z } from "astro/zod";

export const publishingSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  link: z.string().url(),
  order: z.number(),
});
