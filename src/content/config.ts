import { gamesSchema, socialsSchema } from "@/schemas";
import { defineCollection } from "astro:content";

const gamesCollection = defineCollection({
  type: "data",
  schema: gamesSchema,
});

const socialsCollection = defineCollection({
  type: "data",
  schema: socialsSchema
})

export const collections = {
  games: gamesCollection,
  socials: socialsCollection
};
