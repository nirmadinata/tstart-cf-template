import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import type { RouterType } from "@/features/api";
import { appenv } from "@/integrations/appenv";

type RPCClient = RouterClient<RouterType>;

export const getRPCClientLink = createIsomorphicFn()
	.client(() =>
		createORPCClient<RPCClient>(
			new RPCLink({
				url: appenv.VITE_RPC_URL,
			})
		)
	)
	.server(() =>
		createORPCClient<RPCClient>(
			new RPCLink({
				url: appenv.VITE_RPC_URL,
				headers: () => getRequestHeaders(),
			})
		)
	);

export const rpcClient = createTanstackQueryUtils(getRPCClientLink());
