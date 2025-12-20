import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import {
	getTanstackIntegrationContext,
	TanstackIntegrationProvider,
} from "@/integrations/tanstack";

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
		Wrap({ children }) {
			return (
				<TanstackIntegrationProvider queryClient={queryClient}>
					{children}
				</TanstackIntegrationProvider>
			);
		},
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	});

	return router;
};
