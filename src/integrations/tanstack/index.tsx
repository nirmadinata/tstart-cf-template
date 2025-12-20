import type { TanStackDevtoolsReactPlugin } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	queryClient: QueryClient;
}>;

export function TanstackIntegrationProvider({ children, queryClient }: Props) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}

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
