import type { Statements } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

export const ROLE_ENUM = {
	SUPER_ADMIN: "super-admin",
	ADMIN: "admin",
} as const;

const statements = {
	...defaultStatements,

	/**
	 * Records permissions
	 * This is how a user can interact with records or contents in CMS.
	 */
	records: ["create", "update", "delete", "list"],
} satisfies Statements;

export const ac = createAccessControl(statements);

export const roles = {
	[ROLE_ENUM.ADMIN]: ac.newRole({
		...adminAc.statements,
		records: ["create", "update", "delete", "list"],
	}),
	[ROLE_ENUM.SUPER_ADMIN]: ac.newRole({
		...adminAc.statements,
		records: ["create", "update", "delete", "list"],
	}),
} as const;
