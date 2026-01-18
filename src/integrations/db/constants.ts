/**
 * table names
 */
export const TABLE_ALIASES = {
	/**
	 * master tables
	 */
	USERS: "users",
	SESSIONS: "sessions",
	ACCOUNTS: "accounts",
	VERIFICATIONS: "verifications",

	/**
	 * page setting related
	 */
	LOCALES: "locales",
	TAGS: "tags",
	STATIC_PAGE_DATA: "static_page_data",

	/**
	 * media related
	 */
	MIME_TYPES: "mime_types",
	MEDIAS: "media",
	MEDIA_TAGS: "media_tags",
} as const;

export const COLUMN_ALIASES = {
	/**
	 * common columns
	 */
	COMMON_COLUMNS: {
		ID: "id",
		CREATED_AT: "created_at",
		UPDATED_AT: "updated_at",
		CREATED_BY: "created_by",
		UPDATED_BY: "updated_by",
	},

	USERS: {
		NAME: "name",
		EMAIL: "email",
		EMAIL_VERIFIED: "email_verified",
		IMAGE: "image",
		ROLE: "role",
		BANNED: "banned",
		BAN_REASON: "ban_reason",
		BAN_EXPIRES: "ban_expires",
	},
	ACCOUNTS: {
		USER_ID: "user_id",
		ACCOUNT_ID: "account_id",
		PROVIDER_ID: "provider_id",
		ACCESS_TOKEN: "access_token",
		REFRESH_TOKEN: "refresh_token",
		ACCESS_TOKEN_EXPIRES_AT: "access_token_expires_at",
		REFRESH_TOKEN_EXPIRES_AT: "refresh_token_expires_at",
		SCOPE: "scope",
		ID_TOKEN: "id_token",
		PASSWORD: "password",
	},
	SESSIONS: {
		USER_ID: "user_id",
		TOKEN: "token",
		EXPIRES_AT: "expires_at",
		IP_ADDRESS: "ip_address",
		USER_AGENT: "user_agent",
		IMPERSONATED_BY: "impersonated_by",
	},
	VERIFICATIONS: {
		IDENTIFIER: "identifier",
		VALUE: "value",
		EXPIRES_AT: "expires_at",
	},
} as const;

export const INDEXES_ENUM = {
	USERS_EMAIL: "idx_users_email",
	SESSION_USER_ID: "idx_sessions_user_id",
	SESSION_TOKEN: "idx_sessions_token",
	ACCOUNTS_USER_ID: "idx_accounts_user_id",
	VERIFICATIONS_IDENTIFIER: "idx_verifications_identifier",
	TAGS_NAME: "idx_tags_name",
	TAGS_SLUG: "idx_tags_slug",
	LOCALES_CODE: "idx_locales_code",
	LOCALES_NAME: "idx_locales_name",
	MEDIA_NAME: "idx_media_name",
	MIME_TYPES_MIME_TYPE: "idx_mime_types_mime_type",
} as const;

/**
 * constants for schema definitions
 */
export const USER_ROLE_ENUM = {
	ADMIN: "admin",
	USER: "user",
} as const;

export const USER_ROLE_LIST = [
	USER_ROLE_ENUM.ADMIN,
	USER_ROLE_ENUM.USER,
] as const;

export const USER_ROLE_DEFAULT = USER_ROLE_ENUM.ADMIN;

export const SITEMAP_CHANGEFREQ_ENUM = {
	ALWAYS: "always",
	HOURLY: "hourly",
	DAILY: "daily",
	WEEKLY: "weekly",
	MONTHLY: "monthly",
	YEARLY: "yearly",
	NEVER: "never",
} as const;

export const SITEMAP_CHANGEFREQ_LIST = [
	SITEMAP_CHANGEFREQ_ENUM.ALWAYS,
	SITEMAP_CHANGEFREQ_ENUM.HOURLY,
	SITEMAP_CHANGEFREQ_ENUM.DAILY,
	SITEMAP_CHANGEFREQ_ENUM.WEEKLY,
	SITEMAP_CHANGEFREQ_ENUM.MONTHLY,
	SITEMAP_CHANGEFREQ_ENUM.YEARLY,
	SITEMAP_CHANGEFREQ_ENUM.NEVER,
] as const;
