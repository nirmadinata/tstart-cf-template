import type {
	BetterAuthOptions,
	DBAdapter,
	SecondaryStorage,
} from "better-auth";
import type { DB } from "better-auth/adapters/drizzle";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { admin, openAPI } from "better-auth/plugins";
import type { GetInternalDB } from "@/integrations/db";
import { getDB } from "@/integrations/db";
import { COLUMN_ALIASES, TABLE_ALIASES } from "@/integrations/db/constants";
import { getKV } from "@/integrations/kv";
import { ac, ROLE_ENUM, roles } from "./constants";

export * from "./constants";

export type AuthConfig = {
	appName: string;
	secret: string;
	baseURL: string;
	secondaryStorage: SecondaryStorage;
	database: (options: BetterAuthOptions) => DBAdapter<BetterAuthOptions>;
};

function createAuth({
	appName,
	secret,
	baseURL,
	secondaryStorage,
	database,
}: AuthConfig) {
	return betterAuth({
		appName,
		secret,
		baseURL,
		secondaryStorage,
		database,
		account: {
			modelName: TABLE_ALIASES.ACCOUNTS,
			fields: {
				providerId: COLUMN_ALIASES.ACCOUNTS.PROVIDER_ID,
				accountId: COLUMN_ALIASES.ACCOUNTS.ACCOUNT_ID,
				userId: COLUMN_ALIASES.ACCOUNTS.USER_ID,
				password: COLUMN_ALIASES.ACCOUNTS.PASSWORD,
				refreshToken: COLUMN_ALIASES.ACCOUNTS.REFRESH_TOKEN,
				refreshTokenExpiresAt: COLUMN_ALIASES.ACCOUNTS.REFRESH_TOKEN_EXPIRES_AT,
				accessToken: COLUMN_ALIASES.ACCOUNTS.ACCESS_TOKEN,
				accessTokenExpiresAt: COLUMN_ALIASES.ACCOUNTS.ACCESS_TOKEN_EXPIRES_AT,
				scope: COLUMN_ALIASES.ACCOUNTS.SCOPE,
				idToken: COLUMN_ALIASES.ACCOUNTS.ID_TOKEN,
				createdAt: COLUMN_ALIASES.COMMON_COLUMNS.CREATED_AT,
				updatedAt: COLUMN_ALIASES.COMMON_COLUMNS.UPDATED_AT,
			},
			accountLinking: {
				enabled: true,
			},
		},
		user: {
			modelName: TABLE_ALIASES.USERS,
			fields: {
				id: COLUMN_ALIASES.COMMON_COLUMNS.ID,
				name: COLUMN_ALIASES.USERS.NAME,
				email: COLUMN_ALIASES.USERS.EMAIL,
				emailVerified: COLUMN_ALIASES.USERS.EMAIL_VERIFIED,
				image: COLUMN_ALIASES.USERS.IMAGE,
				createdAt: COLUMN_ALIASES.COMMON_COLUMNS.CREATED_AT,
				updatedAt: COLUMN_ALIASES.COMMON_COLUMNS.UPDATED_AT,
			},
		},
		session: {
			modelName: TABLE_ALIASES.SESSIONS,
			fields: {
				userId: COLUMN_ALIASES.SESSIONS.USER_ID,
				token: COLUMN_ALIASES.SESSIONS.TOKEN,
				expiresAt: COLUMN_ALIASES.SESSIONS.EXPIRES_AT,
				ipAddress: COLUMN_ALIASES.SESSIONS.IP_ADDRESS,
				userAgent: COLUMN_ALIASES.SESSIONS.USER_AGENT,
				createdAt: COLUMN_ALIASES.COMMON_COLUMNS.CREATED_AT,
				updatedAt: COLUMN_ALIASES.COMMON_COLUMNS.UPDATED_AT,
			},
		},
		verification: {
			modelName: TABLE_ALIASES.VERIFICATIONS,
			fields: {
				identifier: COLUMN_ALIASES.VERIFICATIONS.IDENTIFIER,
				value: COLUMN_ALIASES.VERIFICATIONS.VALUE,
				expiresAt: COLUMN_ALIASES.VERIFICATIONS.EXPIRES_AT,
				createdAt: COLUMN_ALIASES.COMMON_COLUMNS.CREATED_AT,
				updatedAt: COLUMN_ALIASES.COMMON_COLUMNS.UPDATED_AT,
			},
		},
		plugins: [
			/**
			 * openapi plugin
			 */
			openAPI(),

			/**
			 * admin plugin
			 */
			admin({
				ac,
				roles,
				defaultRole: ROLE_ENUM.ADMIN,
				adminRoles: [ROLE_ENUM.SUPER_ADMIN, ROLE_ENUM.ADMIN],
				allowImpersonatingAdmins: true,
				schema: {
					session: {
						modelName: TABLE_ALIASES.SESSIONS,
						fields: {
							impersonatedBy: COLUMN_ALIASES.SESSIONS.IMPERSONATED_BY,
						},
					},
					user: {
						modelName: TABLE_ALIASES.USERS,
						fields: {
							role: COLUMN_ALIASES.USERS.ROLE,
							banned: COLUMN_ALIASES.USERS.BANNED,
							banReason: COLUMN_ALIASES.USERS.BAN_REASON,
							banExpires: COLUMN_ALIASES.USERS.BAN_EXPIRES,
						},
					},
				},
			}),
		],
	});
}

function getAdapter<D extends DB>(db: D) {
	return drizzleAdapter(db, {
		provider: "sqlite",
	});
}

/**
 * singleton instance of BetterAuth
 */
let _auth: ReturnType<typeof createAuth> | null = null;
let _dbAdapter: ReturnType<typeof getAdapter> | null = null;

export function getDBAdapter(db: GetInternalDB) {
	_dbAdapter ??= getAdapter(db);
	return _dbAdapter;
}

export function getAuth(env: CloudflareEnv) {
	_auth ??= createAuth({
		appName: env.VITE_APP_NAME || "NataAPI",
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.VITE_BETTER_AUTH_URL,
		secondaryStorage: getKV(env),
		database: getDBAdapter(getDB(env)),
	});

	return _auth;
}

export type Auth = ReturnType<typeof createAuth>;
