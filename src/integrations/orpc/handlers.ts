import { ORPCError, onError } from "@orpc/client";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import type {
	OpenAPIReferencePluginOptions,
} from "@orpc/openapi/plugins";
import {
	OpenAPIReferencePlugin,
} from "@orpc/openapi/plugins";
import type { Context } from "@orpc/server";
import { ValidationError } from "@orpc/server";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { z } from "zod";

export function createHandler<Router extends {}>(
	router: Router,
	openApiOptions: OpenAPIReferencePluginOptions<Context>
) {
	return new OpenAPIHandler(router, {
		plugins: [
			new OpenAPIReferencePlugin({
				schemaConverters: [new ZodToJsonSchemaConverter()],
				...openApiOptions,
			}),
		],
		interceptors: [
			onError((error) => {
				console.log(error);
			}),
		],
		clientInterceptors: [
			onError((error) => {
				console.log(error);

				/**
				 * skip check if not ORPCError or not ValidationError
				 */
				if (!(error instanceof ORPCError)) {
					throw new Error(`${error}`);
				}

				if (!(error.cause instanceof ValidationError)) {
					throw new ORPCError("INTERNAL_SERVER_ERROR", {
						data: error.cause,
					});
				}

				/**
				 * convert to ZodError for better formatting
				 */
				const zodError = new z.ZodError(
					error.cause.issues as z.core.$ZodIssue[]
				);
				const errorCode = error.code;
				const message = z.prettifyError(zodError);
				const data = z.flattenError(zodError);
				const cause = error.cause;

				const map = {
					BAD_REQUEST: {
						code: "INPUT_VALIDATION_ERROR",
						status: 422,
					},
					INTERNAL_SERVER_ERROR: {
						code: "OUTPUT_VALIDATION_ERROR",
						status: 500,
					},
				} as const;

				const m = map?.[errorCode as keyof typeof map];
				if (!m) {
					throw new ORPCError("INTERNAL_SERVER_ERROR");
				}

				const err = m
					? new ORPCError(m.code, {
							status: m.status,
							message,
							data,
							cause,
						})
					: null;

				if (err) {
					throw err;
				}
			}),
		],
	});
}

export type CreateHandlerType = ReturnType<typeof createHandler>;
