import { os } from "@orpc/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import z from "zod";
import { getAuth } from "@/integrations/auth";
import { getDB } from "@/integrations/internal-db";
import { getKV } from "@/integrations/internal-kv";
import type { AppContext } from "@/integrations/orpc/types";

export const base = os.$context<AppContext>().errors({
	INTERNAL_SERVER_ERROR: {
		message: "An internal server error occurred",
	},

	BAD_REQUEST: {
		message: "The request was invalid or cannot be served",
	},

	UNAUTHORIZED: {
		message: "The request requires user authentication",
	},

	NOT_FOUND: {
		message: "The requested resource could not be found",
	},

	INPUT_VALIDATION_FAILED: {
		status: 422,
		data: z.object({
			formErrors: z.array(z.string()),
			fieldErrors: z.record(z.string(), z.array(z.string()).optional()),
		}),
	},
	OUTPUT_VALIDATION_FAILED: {
		status: 500,
		message: "The server output validation failed",
		data: z.object({
			formErrors: z.array(z.string()),
			fieldErrors: z.record(z.string(), z.array(z.string()).optional()),
		}),
	},
});

/**
 * middlewares
 */

export const injectHeadersMiddleware = base.middleware(({ context, next }) =>
	next({
		context: {
			...context,
			headers: getRequestHeaders(),
		},
	})
);

export const initStorageMiddleware = base.middleware(({ context, next }) =>
	next({
		context: {
			...context,
			kv: getKV(context.env),
			db: getDB(context.env),
		},
	})
);

export const initAuthenticationMiddleware = base.middleware(
	({ context, next }) =>
		next({
			context: {
				...context,
				auth: getAuth(context.env),
			},
		})
);

export const ensureAdminMiddleware = injectHeadersMiddleware
	.concat(initAuthenticationMiddleware)
	.concat(async ({ context, next, errors }) => {
		const session = await context.auth.api.getSession({
			headers: context.headers,
		});

		if (!session?.session) {
			throw errors.UNAUTHORIZED();
		}

		return next({
			context: {
				...context,
				session: session.session,
				user: session.user,
			},
		});
	});
