import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import type { PropsWithChildren, } from "react";
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

type Props = PropsWithChildren;

function RootDocument({ children }: Props) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{/* TODO: add navbars here */}
				{children}
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
