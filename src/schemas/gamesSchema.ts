import { z } from "astro/zod";

export const gamesSchema = z.object({
  title: z.string(),
  thumbnail: z.string(),
  tags: z.array(z.string()).optional(),
  link: z.string().url().optional(),
  links: z
    .object({
      playgame: z.string().url().optional(),
      apple: z.string().url().optional(),
      google: z.string().url().optional(),
    })
    .optional(),
  category: z.enum(["test", "dev", "hot", "new", ""]).optional(),
});
