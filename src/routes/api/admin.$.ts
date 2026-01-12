import { createFileRoute } from "@tanstack/react-router";
import { getAdminApiHandler } from "@/integrations/orpc/handlers";

export const Route = createFileRoute("/api/admin/$")({
	server: {
		handlers: {
			ANY({ request }) {
				return (
					getAdminApiHandler({})
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
