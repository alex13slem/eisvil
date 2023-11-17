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
  langs: z.array(
    z
      .object({
        lang: z.string(),
        slug: z.string(),
        voice: z.boolean(),
        text: z.boolean(),
      })
      .optional(),
  ),
  thumbnail: z.string(),
  hero_image: z.string(),
  ad_banner: z.object({ src: z.string(), alt: z.string() }),

  status: z.enum(["test", "dev", "hot", "new"]).optional(),
  favorites: z.enum(["top", "best"]).optional(),
  platforms: z
    .object({
      playstation: z.string().optional(),
      epic: z.string().optional(),
      ru_store: z.string().optional(),
      steam: z.string().optional(),
      yandex: z.string().optional(),
      xbox: z.string().optional(),
      app_gallery: z.string().optional(),
      vk: z.string().optional(),
      nintendo: z.string().optional(),
      google: z.string().optional(),
      apple: z.string().optional(),
    })
    .optional(),
});
