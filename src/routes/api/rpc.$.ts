import { env } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import { router } from "@/features/api";
import type { CreateHandlerType } from "@/integrations/orpc/handlers";
import { createHandler } from "@/integrations/orpc/handlers";

let handler: CreateHandlerType | null = null;

export function getHandler() {
	handler ??= createHandler(router);
	return handler;
}

export const Route = createFileRoute("/api/rpc/$")({
	server: {
		handlers: {
			async ANY({ request }) {
				const { response } = await getHandler().handle(request, {
					context: {
						env,
					},
				});

				return response ?? new Response("Not Found", { status: 404 });
			},
		},
	},
});
