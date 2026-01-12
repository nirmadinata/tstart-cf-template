import { ORPCError, onError } from "@orpc/client";
import type { ConditionalSchemaConverter } from "@orpc/openapi";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import {
	OpenAPIReferencePlugin,
	type OpenAPIReferencePluginOptions,
} from "@orpc/openapi/plugins";
import type { Context } from "@orpc/server";
import { ValidationError } from "@orpc/server";
import { ZodToJsonSchemaConverter } from "@orpc/zod";
import z from "zod";

const schemaConverters: ConditionalSchemaConverter[] = [
	new ZodToJsonSchemaConverter(),
];

function createHandler<Router extends {}>(
	router: Router,
	openApiOptions: OpenAPIReferencePluginOptions<Context>
) {
	return new OpenAPIHandler(router, {
		plugins: [
			new OpenAPIReferencePlugin({
				schemaConverters,
				...openApiOptions,
			}),
		],
		clientInterceptors: [
			onError((error) => {
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

type CreateHandlerType = ReturnType<typeof createHandler>;

/**
 * singleton accessor for ORPC handler
 */
let _adminAPIHandler: CreateHandlerType | null = null;
let _publicAPIHandler: CreateHandlerType | null = null;

/**
 * get API handler
 */
export function getAdminApiHandler<Router extends {}>(router: Router) {
	_adminAPIHandler ??= createHandler(router, {
		docsTitle: "CMS Admin API Docs",
		docsPath: "/api/admin",
		specPath: "/api/admin/docs.json",
		specGenerateOptions: {
			info: {
				title: "CMS Admin API Docs",
				version: "1.0.0",
			},
		},
	});
	return _adminAPIHandler;
}

export function getPublicApiHandler<Router extends {}>(router: Router) {
	_publicAPIHandler ??= createHandler(router, {
		docsTitle: "Public API Docs",
		docsPath: "/api/public",
		specPath: "/api/public/docs.json",
		specGenerateOptions: {
			info: {
				title: "Public API Docs",
				version: "1.0.0",
			},
		},
	});
	return _publicAPIHandler;
}
