import { type QueryClient, useQuery } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { Suspense } from "react";
import { plugins, TSDevtools } from "@/integrations/tanstack";
import appCss from "@/styles.css?url";

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
	const { data } = useQuery({
		queryKey: ["hello"],
		queryFn: async () => {
			await new Promise((r) => setTimeout(r, 1000));

			return "hello";
		},
	});

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{/* TODO: add navbars here */}
				{children}
				<div>Tadaaaa: {data}</div>
				<Suspense>
					<TSDevtools
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
