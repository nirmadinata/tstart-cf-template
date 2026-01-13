import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

let path = "";
if (process.env.ENV === "production") {
	path = ".env.production";
} else if (process.env.ENV === "local") {
	path = ".env.local";
}

config({ path });

export default defineConfig({
	out: "./src/integrations/db/migrations",
	schema: "./src/integrations/db/schema.ts",
	dialect: "sqlite",
	driver: "d1-http",
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
		databaseId: process.env.CLOUDFLARE_DATABASE_ID,
		token: process.env.CLOUDFLARE_API_TOKEN,
	},
});
