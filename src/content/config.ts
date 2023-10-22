import { defineCollection } from "astro:content";
import { gamesSchema } from "../schemas";

const gamesCollection = defineCollection({
  type: "data",
  schema: gamesSchema,
});

export const collections = {
  games: gamesCollection,
};
