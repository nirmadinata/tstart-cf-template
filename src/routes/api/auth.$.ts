import { env } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import { getAuth } from "@/integrations/auth";

export const Route = createFileRoute("/api/auth/$")({
	server: {
		handlers: {
			ANY: ({ request }: { request: Request }) => getAuth(env).handler(request),
		},
	},
});
