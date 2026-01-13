import { env } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import { adminApiRouter } from "@/features/api";
import {
	type CreateHandlerType,
	createHandler,
} from "@/integrations/orpc/handlers";

let handler: CreateHandlerType | null = null;

function getHandler() {
	handler ??= createHandler(adminApiRouter, {
		docsTitle: "CMS Admin API Docs",
		docsPath: "/api/admin",
		specPath: "/api/admin/docs.json",
		specGenerateOptions: {
			info: {
				title: "CMS Admin API Docs",
				version: "1.0.0",
			},
		},
	});

	return handler;
}

export const Route = createFileRoute("/api/admin/$")({
	server: {
		handlers: {
			async ANY({ request }) {
				const { response } = await getHandler().handle(request, {
					prefix: "/api/admin",
					context: {
						env,
					},
				});

				return response ?? new Response("Not Found", { status: 404 });
			},
		},
	},
});
