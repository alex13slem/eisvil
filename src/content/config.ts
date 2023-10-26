import { gamesSchema, socialsSchema } from "@/schemas";
import { defineCollection } from "astro:content";
import { publishingSchema } from "../schemas/publishingSchema";
import { servicesSchema } from "../schemas/servicesSchema";

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

const publishingCollection = defineCollection({
  type: "content",
  schema: publishingSchema,
});

export const collections = {
  games: gamesCollection,
  socials: socialsCollection,
  services: servicesCollection,
  publishing: publishingCollection,
};
