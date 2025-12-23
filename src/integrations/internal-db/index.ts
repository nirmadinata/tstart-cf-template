import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getInternalDB() {
	return drizzle(env.INTERNAL_DB, {
		schema,
		casing: "snake_case",
	});
}
