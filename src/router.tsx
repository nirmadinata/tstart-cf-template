import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { getTanstackIntegrationContext } from "@/integrations/tanstack";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
	const { queryClient } = getTanstackIntegrationContext();

	const router = createRouter({
		routeTree,
		context: {
			queryClient,
		},
		defaultPreload: "intent",
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	});

	return router;
};
