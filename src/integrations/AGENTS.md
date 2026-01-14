# Integrations Directory Agents

## Guidelines

- **Purpose**: This directory contains ISOLATED modules for third-party services and internal infrastructure.
- **Pattern**: Each subdirectory (e.g., `db`, `email`) should treat itself as a standalone package/module.
- **Exports**: Expose functionality via `index.ts`. Other parts of the app should import from the integration root, not deep imports if possible.

## Critical Libraries & Modules

### `db` (Drizzle ORM + Cloudflare D1)
- **Library**: `drizzle-orm`, `drizzle-kit`.
- **Access**: Use `getDB()` or `getInternalDB()` to get the db instance.
- **Do's**:
  - **ALWAYS** use constants from `constants.ts` for Table Names and Column Names.
  - Usage Example: `[COMMON_COLUMN_ENUM.CREATED_AT]: int({ mode: "timestamp" })`
  - Run `bun run db:generate` immediately after modifying `schema.ts`.
- **Don'ts**:
  - **NEVER** hardcode string literals for column names in schema definitions.
  - Do not manually create migration SQL files; let Drizzle Kit handle it.

### `auth` (Better Auth)
- **Library**: `better-auth`.
- **Configuration**: Located in `index.ts`.
- **Do's**:
  - Use exported hooks/functions from `@/integrations/auth` (e.g., `getAuth`, `authClient`).
  - Respect the database schema mappings defined in `constants.ts`.
- **Don'ts**:
  - Do not modify internal usage of `better-auth` plugins without understanding the schema implications.

### `orpc` (Type-Safe API)
- **Library**: `@orpc/server` family.
- **Purpose**: Infrastructure for the API (Context, Base Builder, Middlewares).
- **Files**:
    - `base.ts`: The ORPC builder instance and common middlewares.
    - `handlers.ts`: Helpers to create fetch handlers.
    - `types.ts`: AppContext definitions.
- **Best Practice**:
    - Use `os.context<AppContext>()` for type-safe context access.
    - Define reusable middlewares in `base.ts` if they apply globally.

### `kv` (Cloudflare KV)
- **Wrapper**: `getKV(env)`.
- **Do's**: Always use the wrapper to ensure consistent typing and potential future abstraction.
- **Don'ts**: Do not access `env.INTERNAL_KV` directly in business logic.

## Maintenance Rules

- If you add a new integration (e.g., `stripe`, `redis`), create a new folder and follow the `index.ts` export pattern.
- If you change `schema.ts`, you **MUST** run `bun run db:generate`.
