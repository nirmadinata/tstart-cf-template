import { z } from "zod";

export const listProductOutputSchema = z.object({
	body: z.optional(
		z.object({
			data: z.object({
				items: z.array(
					z.object({
						id: z.string(),
						name: z.string(),
						price: z.number(),
					})
				),
				pagination: z.object({
					total: z.number(),
					count: z.number(),
					per_page: z.number(),
					current_page: z.number(),
					total_pages: z.number(),
				}),
			}),
		})
	),
});

export const getProductByIdInputSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
});

export const getProductByIdOutputSchema = z.object({
	body: z.optional(
		z.object({
			data: z.object({
				id: z.string(),
				name: z.string(),
				price: z.number(),
			}),
		})
	),
});
