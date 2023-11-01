import { z } from "astro/zod";

export const publishingSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  link: z.string().url(),
  order: z.number(),
});
