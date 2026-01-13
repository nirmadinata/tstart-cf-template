import { env } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import { publicApiRouter } from "@/features/api";
import {
	type CreateHandlerType,
	createHandler,
} from "@/integrations/orpc/handlers";

let handler: CreateHandlerType | null = null;

export function getHandler() {
	handler ??= createHandler(publicApiRouter, {
		docsTitle: "Public API Docs",
		docsPath: "/api/public",
		specPath: "/api/public/docs.json",
		specGenerateOptions: {
			info: {
				title: "Public API Docs",
				version: "1.0.0",
			},
		},
	});
	return handler;
}

export const Route = createFileRoute("/api/public/$")({
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
