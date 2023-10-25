import { z } from "astro/zod";

export const socialsSchema = z.object({
  name: z.string(),
  link: z.string().url(),
  fontFamily: z.string().toLowerCase().optional(),
});
