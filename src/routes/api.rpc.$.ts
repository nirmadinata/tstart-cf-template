import { RPCHandler } from "@orpc/server/fetch";
import { createFileRoute } from "@tanstack/react-router";
import router from "@/orpc/router";

const handler = new RPCHandler(router);

type HandleParams = {
	request: Request;
};

async function handle({ request }: HandleParams) {
	const { response } = await handler.handle(request, {
		prefix: "/api/rpc",
		context: {},
	});

	return response ?? new Response("Not Found", { status: 404 });
}

export const Route = createFileRoute("/api/rpc/$")({
	server: {
		handlers: {
			HEAD: handle,
			GET: handle,
			POST: handle,
			PUT: handle,
			PATCH: handle,
			DELETE: handle,
		},
	},
});
