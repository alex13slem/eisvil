import { z } from "astro/zod";

export const gamesSchema = z.object({
  name: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  tags: z.array(z.string()).optional(),
  links: z
    .object({
      playgame: z.string().url().optional(),
      apple: z.string().url().optional(),
      google: z.string().url().optional(),
    })
    .optional(),
  category: z.enum(["test", "dev", "hot", "new", ""]).optional(),
});
