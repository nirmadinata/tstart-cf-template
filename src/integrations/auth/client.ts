import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { appenv } from "@/integrations/appenv";
import type { Auth } from "@/integrations/auth";

/**
 * Better Auth React client for TanStack Start
 *
 * Usage:
 * - `authClient.signIn.email({ email, password })`
 * - `authClient.signUp.email({ email, password, name })`
 * - `authClient.signOut()`
 * - `authClient.useSession()` - React hook for session state
 * - `authClient.admin.*` - Admin operations (requires admin role)
 */
export const authClient = createAuthClient({
	baseURL: appenv.VITE_BETTER_AUTH_URL,
	plugins: [adminClient(), inferAdditionalFields<Auth>()],
});

/**
 * Type exports for Better Auth
 */
export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;
