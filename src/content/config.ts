import { gamesSchema, socialsSchema } from "@/schemas";
import { servicesSchema } from "../schemas/servicesSchema";
import { defineCollection } from "astro:content";

const gamesCollection = defineCollection({
  type: "data",
  schema: gamesSchema,
});

const socialsCollection = defineCollection({
  type: "data",
  schema: socialsSchema,
});

const servicesCollection = defineCollection({
  type: "content",
  schema: servicesSchema,
});

export const collections = {
  games: gamesCollection,
  socials: socialsCollection,
  services: servicesCollection,
};
