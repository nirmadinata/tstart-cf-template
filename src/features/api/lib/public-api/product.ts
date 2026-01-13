import {
	getProductByIdInputSchema,
	getProductByIdOutputSchema,
	listProductOutputSchema,
} from "@/features/api/lib/public-api/product.schema";

import {
	base,
	initStorageMiddleware,
	injectHeadersMiddleware,
} from "@/integrations/orpc/base";

const builder = base.use(injectHeadersMiddleware).use(initStorageMiddleware);

export const listProduct = builder
	.route({
		method: "GET",
		path: "/products",
		summary: "List Products",
		description: "Retrieve a list of products",
		// inputStructure: "detailed",
		outputStructure: "detailed",
		tags: ["Product"],
	})
	.output(listProductOutputSchema)
	.handler(async () => {
		await new Promise((resolve) => setTimeout(resolve, 100));

		return {
			body: {
				data: {
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
				},
			},
		};
	});

export const getProductById = builder
	.route({
		method: "GET",
		path: "/products/{id}",
		summary: "Get Product by ID",
		description: "Retrieve a product by its ID",
		inputStructure: "detailed",
		outputStructure: "detailed",
		tags: ["Product"],
	})
	.input(getProductByIdInputSchema)
	.output(getProductByIdOutputSchema)
	.handler(async ({ input }) => {
		await new Promise((resolve) => setTimeout(resolve, 100));

		return {
			status: 200,
			headers: {},
			body: {
				data: {
					id: input.params.id,
					name: "Sample Product",
					price: 19.99,
				},
			},
		};
	});
