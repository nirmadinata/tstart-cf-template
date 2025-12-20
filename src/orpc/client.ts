import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createRouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import router from "@/orpc/router";

type CustomRouter = typeof router;

const getORPCClient = createIsomorphicFn()
	.server<[], RouterClient<CustomRouter>>(() =>
		createRouterClient(router, {
			context: () => ({
				headers: getRequestHeaders(),
			}),
		})
	)
	.client<RouterClient<CustomRouter>>(() => {
		const link = new RPCLink({
			url: `${window.location.origin}/api/rpc`,
		});
		return createORPCClient(link);
	});

const client: RouterClient<typeof router> = getORPCClient();
export const orpc = createTanstackQueryUtils(client);
