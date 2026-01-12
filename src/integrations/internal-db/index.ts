import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

function createInternalDB(env: CloudflareEnv) {
	return drizzle(env.INTERNAL_DB, {
		schema,
		casing: "snake_case",
	});
}

/**
 * singleton accessor for internal DB
 */
let _db: ReturnType<typeof createInternalDB> | null = null;

export function getDB(env: CloudflareEnv) {
	_db ??= createInternalDB(env);
	return _db;
}

export type GetInternalDB = ReturnType<typeof getDB>;
