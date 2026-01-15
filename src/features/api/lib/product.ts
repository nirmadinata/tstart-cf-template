import {
	getProductByIdInputSchema,
	getProductByIdOutputSchema,
	listProductOutputSchema,
} from "@/features/api/lib/product.schema";

import {
	base,
	initStorageMiddleware,
	injectHeadersMiddleware,
} from "@/integrations/orpc/base";

const builder = base.use(injectHeadersMiddleware).use(initStorageMiddleware);
const tags = ["Products"];

export const listProduct = builder
	.route({
		tags,
		summary: "List Products",
		description: "Retrieve a list of products.",
	})
	.output(listProductOutputSchema)
	.handler(async () => {
		await new Promise((resolve) => setTimeout(resolve, 100));

		return {
			items: [
				{
					id: "prod_123",
					name: "Sample Product",
					description: "This is a sample product.",
					price: 19.99,
				},
			],
			pagination: {
				total: 1,
				count: 1,
				per_page: 10,
				current_page: 1,
				total_pages: 1,
			},
		};
	});

export const getProductById = builder
	.route({
		tags,
		summary: "Get Product by ID",
		description: "Retrieve a product by its ID.",
		spec(current) {
			return {
				...current,
				security: [
					{
						"api-key": [],
					},
				],
			};
		},
	})
	.input(getProductByIdInputSchema)
	.output(getProductByIdOutputSchema)
	.handler(async ({ input }) => {
		await new Promise((resolve) => setTimeout(resolve, 100));

		return {
			id: input.id,
			name: "Sample Product",
			price: 19.99,
		};
	});
