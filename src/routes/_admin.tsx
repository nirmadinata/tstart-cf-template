import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
	component: RouteComponent,
	head: async (_) => ({
		links: [
			{
				rel: "stylesheet",
				href: (await import("@/styles/shadcn.css?url")).default,
			},
		],
	}),
});

function RouteComponent() {
	return <Outlet />;
}
