import type { TanStackDevtoolsReactPlugin } from "@tanstack/react-devtools";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import React from "react";

export const TanStackDevtools = import.meta.env.DEV
	? React.lazy(() =>
			import("@tanstack/react-devtools").then((mod) => ({
				default: mod.TanStackDevtools,
			}))
		)
	: () => null;

export function getTanstackIntegrationContext() {
	const queryClient = new QueryClient();
	return {
		queryClient,
	};
}

export const plugins: TanStackDevtoolsReactPlugin[] = [
	{
		name: "Tanstack Router",
		render: <TanStackRouterDevtoolsPanel />,
	},
	{
		name: "Tanstack Query",
		render: <ReactQueryDevtoolsPanel />,
	},
];
