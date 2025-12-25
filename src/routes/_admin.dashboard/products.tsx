import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/dashboard/products")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div className="">Hello "/dashboard/products"!</div>;
}
