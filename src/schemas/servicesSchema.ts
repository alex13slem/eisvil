import { z } from "astro:content";

export const servicesSchema = z.object({
	title: z.string(),
	images: z.array(z.object({
		src: z.string().url(),
		alt: z.string()
	})),
	link: z.string().url().optional(),
	order: z.number()
})