import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import type { AdminAPIRouterType, PublicAPIRouterType } from "@/features/api";
import { appenv } from "@/integrations/appenv";

type PublicRouterClient = RouterClient<PublicAPIRouterType>;
type AdminRouterClient = RouterClient<AdminAPIRouterType>;

export const getPublicClientLink = createIsomorphicFn()
	.client(() =>
		createORPCClient<PublicRouterClient>(
			new RPCLink({ url: appenv.VITE_API_URL })
		)
	)
	.server(() =>
		createORPCClient<PublicRouterClient>(
			new RPCLink({
				url: appenv.VITE_API_URL,
				headers: () => getRequestHeaders(),
			})
		)
	);

export const getAdminClientLink = createIsomorphicFn()
	.client(() =>
		createORPCClient<AdminRouterClient>(
			new RPCLink({ url: appenv.VITE_RPC_URL })
		)
	)
	.server(() =>
		createORPCClient<AdminRouterClient>(
			new RPCLink({
				url: appenv.VITE_RPC_URL,
				headers: () => getRequestHeaders(),
			})
		)
	);
