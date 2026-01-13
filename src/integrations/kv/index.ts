import type { SecondaryStorage } from "better-auth";

interface StandardKVInterface extends SecondaryStorage {}

function createKV(env: CloudflareEnv): StandardKVInterface {
	return {
		delete: env.INTERNAL_KV.delete,
		get: env.INTERNAL_KV.get,
		set: (key, value, ttl) =>
			env.INTERNAL_KV.put(key, value, ttl ? { expirationTtl: ttl } : undefined),
	};
}

/**
 * singleton accessor for internal KV
 */
let _kv: StandardKVInterface | null = null;

export function getKV(env: CloudflareEnv) {
	_kv ??= createKV(env);
	return _kv;
}
