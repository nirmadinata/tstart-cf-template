# Integrations Directory Agents

## Guidelines

- **Purpose**: This directory contains ISOLATED modules for third-party services and internal infrastructure.
- **Pattern**: Each subdirectory (e.g., `db`, `email`) should treat itself as a standalone package/module.
- **Exports**: Expose functionality via `index.ts`. Other parts of the app should import from the integration root, not deep imports if possible.

## Modules

### `db`
- **ORM**: Drizzle ORM with Cloudflare D1.
- **Access**: Use `getInternalDB()` to get the db instance.
- **Schema**: Defined in `schema.ts`.
- **Constants**: **MUST** use `constants.ts` for table and column names to ensure consistency.
- **Snake Case**: The DB is configured with `casing: "snake_case"`.
- **Migration Workflow**:
  1. Modify `schema.ts`.
  2. Generate: `bun run db:generate`.
  3. Apply Local: `bun run db:local:migrate`.
  4. Apply Prod: `bun run db:production:migrate`.

### `appenv`
- **Env Vars**: T3 Env definition. Validates environment variables at runtime.

### `email`
- Email sending logic and templates.

### `kv`
- **Wrappers**: Use `getKV(env)` from inside this module.
- **Interface**: Provides a standard interface over ClKV.

### `orpc`
- **Purpose**: Infrastructure for the API (Context, Base Builder, Middlewares).
- **Files**:
    - `base.ts`: The ORPC builder instance and common middlewares.
    - `handlers.ts`: Helpers to create fetch handlers.
    - `types.ts`: AppContext definitions.

## Maintenance

- If you change `schema.ts`, you MUST run `bun run db:internal:generate` to generate migrations.
