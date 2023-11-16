import { z } from "astro/zod";

// export const gamesSchema = z.object({
//   title: z.string(),
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

const zLang = z.object({ voice: z.boolean(), text: z.boolean() });

export const gamesSchema = z.object({
  title: z.string(),
  genre: z.enum([
    "arcade",
    "rpg",
    "shooter",
    "racing",
    "action",
    "strategy",
    "fighting",
    "horror",
    "simulator",
    "stealth",
  ]),
  developer: z.string(),
  publisher: z.string(),
  date: z.string(),
  description: z.string(),
  body: z.string(),
  langs: z.object({ ru: zLang, en: zLang }),
  thumbnail: z.string(),
  hero_image: z.string(),
  ad_banner: z.object({ src: z.string(), alt: z.string() }),

  // category: z.enum(["test", "dev", "hot", "new", ""]).optional(),
});
