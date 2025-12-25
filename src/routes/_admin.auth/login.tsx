import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(admin)/auth/login"!</div>;
}
