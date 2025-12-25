import { env } from "cloudflare:workers";

export function getInternalKV() {
	return env.INTERNAL_KV;
}
