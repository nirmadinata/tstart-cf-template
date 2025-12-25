import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const appenv = createEnv({
	server: {
		/**
		 * better auth secret key
		 */
		BETTER_AUTH_SECRET: z.string(),

		/**
		 * plunk email service API key
		 */
		PLUNK_API_KEY: z.string().optional(),
	},

	/**
	 * The prefix that client-side variables must have. This is enforced both at
	 * a type-level and at runtime.
	 */
	clientPrefix: "VITE_",

	client: {
		/**
		 * our website base URL
		 */
		VITE_BASE_URL: z.url(),

		/**
		 * our API base URL
		 */
		VITE_API_URL: z.url(),

		/**
		 * the RPC URL for blockchain interactions
		 */
		VITE_RPC_URL: z.url(),

		/**
		 * the Better Auth service URL
		 */
		VITE_BETTER_AUTH_URL: z.url(),
	},

	/**
	 * What object holds the environment variables at runtime. This is usually
	 * `process.env` or `import.meta.env`.
	 */
	runtimeEnv: {
		...import.meta.env,
		...process.env,
	},

	/**
	 * By default, this library will feed the environment variables directly to
	 * the Zod validator.
	 *
	 * This means that if you have an empty string for a value that is supposed
	 * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
	 * it as a type mismatch violation. Additionally, if you have an empty string
	 * for a value that is supposed to be a string with a default value (e.g.
	 * `DOMAIN=` in an ".env" file), the default value will never be applied.
	 *
	 * In order to solve these issues, we recommend that all new projects
	 * explicitly specify this option as true.
	 */
	emptyStringAsUndefined: true,
});
