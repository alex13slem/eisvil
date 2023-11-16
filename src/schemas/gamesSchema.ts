import { z } from "astro/zod";

export const gamesSchema = z.object({
  title: z.string(),
  thumbnail: z.string(),
  tags: z.array(z.string().optional()),
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

// export const gamesSchema = z.object({
//   title: z.string(),
//   genre: z.enum([]),
//   developer: z.string(),
//   publisher: z.string(),
//   date: z.date(),
//   description: z.string(),
//   body: z.string(),
//   thumbnail: z.string(),
//   tags: z.array(z.string().optional()),
//   link: z.string().url().optional(),
//   links: z
//     .object({
//       playgame: z.string().url().optional(),
//       apple: z.string().url().optional(),
//       google: z.string().url().optional(),
//     })
//     .optional(),
//   category: z.enum(["test", "dev", "hot", "new", ""]).optional(),
// });
