import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/auth/forgot-password")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(admin)/auth/forgot-password"!</div>;
}
