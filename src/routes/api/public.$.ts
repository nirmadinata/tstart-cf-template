import { createFileRoute } from "@tanstack/react-router";
import { getPublicApiHandler } from "@/integrations/orpc/handlers";

export const Route = createFileRoute("/api/public/$")({
	server: {
		handlers: {
			ANY({ request }) {
				return (
					getPublicApiHandler({})
						.handle(request)
						.then((res) => res.response)
						.catch(
							(error) =>
								new Response("Internal Server Error", {
									status: 500,
									statusText: error,
								})
						) ??
					new Response("Not Found", {
						status: 404,
					})
				);
			},
		},
	},
});
