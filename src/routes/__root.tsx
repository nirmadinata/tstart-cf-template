import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";
import { Suspense } from "react";
import { plugins } from "@/integrations/tanstack";
import appCss from "@/styles/styles.css?url";

type RootContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootContext>()({
	head: async () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
			{},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument() {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{/* TODO: add navbars here */}
				<NuqsAdapter>
					<Outlet />
				</NuqsAdapter>
				<Suspense>
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={plugins}
					/>
				</Suspense>
				<Scripts />
			</body>
		</html>
	);
}
